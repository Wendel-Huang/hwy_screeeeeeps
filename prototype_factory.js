var stoTerBlcMaterial={
	//sto与ter转入转出，不做,不需要fac等级的
	"W2S2":{"utrium_bar":1000,"zynthium_bar":1000,"lemergium_bar":1000,"keanium_bar":1000,"purifier":1000,"oxidant":1000,"reductant":1000},
	"E5S1":{"L":5000}
}
var fac2TerMaterial={
	//fac转出到ter,要做（后面的数字意义：factory存量大于此数字，转出此数字的量到terminal)
	"W2S2":{"utrium_bar":1000,"zynthium_bar":1000,"lemergium_bar":1000,"keanium_bar":1000,"purifier":1000,"oxidant":1000,"reductant":1000},
	"E1S5":{
		"wire":400,"condensate":400,"alloy":400,"cell":400
	},
	"E5S1":{
		"switch":100,"concentrate":100,"tube":100,"phlegm":100,"composite":100
	},
	"E5S2":{
		"transistor":30,"extract":30,"fixtures":30,"tissue":30,"crystal":100
	},
	"E6S2":{
		"microchip":1,"spirit":1,"frame":1,"muscle":1
	}
}



StructureFactory.prototype.pushPowerTask=function(){
	if(!Memory.powerTaskList){
		Memory.powerTaskList={};
	}
	if(!Memory.powerTaskList[this.room.name]){
		Memory.powerTaskList[this.room.name]=["controllerNeedEnable"];
	}
	if(!this.effects||!this.effects[0]){
		if(Memory.powerTaskList[this.room.name].indexOf("factoryNeedOperate")==-1){
			Memory.powerTaskList[this.room.name].push("factoryNeedOperate");
			console.log(this.room.name+" pushTask factoryNeedOperate")
		}
	}
}

StructureFactory.prototype.pushTask=function(fromID,toID,theAmount,theType){
	var task={
		fromId:fromID,
		toId:toID,
		amount:theAmount,
		resourceType:theType
	}
	this.room.addCenterTask(task);
}

StructureFactory.prototype.work=function(){
	if(Game.time%5==0){
		//每5tick检查原料，推送任务
		this.checkItem();
	}

	for(let product in fac2TerMaterial[this.room.name]){
		try{
			let work=true;
			for(let component in COMMODITIES[product].components){
				if(this.store[component]<COMMODITIES[product].components[component]){
					work=false;
					this.room.addFacComponentTask(component,COMMODITIES[product].components[component]*10-this.store[component]);
				}
			}
			if(work){
				let returnValue=this.produce(product);
				if(returnValue==ERR_TIRED){
					return -11;
				}
				else if(returnValue==OK){
					console.log(this.room.name+" is producing: "+product);
					return 0;
				}
				else if(returnValue==ERR_BUSY||returnValue==ERR_INVALID_TARGET){
					this.pushPowerTask();
					return -4;
				}
				else{
					console.log(this.room.name+" produce errorCode: "+returnValue);
					return -1;
				}
			}
		}catch(err){
			console.log(product)
		}
	}

}




StructureFactory.prototype.checkItem=function(){
	let roomname=this.room.name;

	//storage和terminal 数量平衡，
	for(let resourceType in stoTerBlcMaterial[roomname]){
		let resourceNum=stoTerBlcMaterial[roomname][resourceType];
		// console.log(resourceType+" lll ")
		if(this.room.terminal.store[resourceType]>=2*resourceNum){
			this.pushTask(this.room.terminal.id,this.room.storage.id,resourceNum,resourceType);
		}else if(this.room.terminal.store[resourceType]<resourceNum&&this.room.storage.store[resourceType]>=resourceNum-this.room.terminal.store[resourceType]){
			//factory存量小于1000，storage存量大于1000，移回factory
			this.pushTask(this.room.storage.id,this.room.terminal.id,resourceNum-this.room.terminal.store[resourceType],resourceType);
		}
	}

	//产物从factory移到terminal
	for(let resourceType in fac2TerMaterial[roomname]){
		let resourceNum=fac2TerMaterial[roomname][resourceType];
		if(this.store[resourceType]>=resourceNum){
			this.pushTask(this.id,this.room.terminal.id,this.store[resourceType],resourceType);
		}
	}

}
