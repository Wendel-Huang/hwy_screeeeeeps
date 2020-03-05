// StructureFactory.prototype.prepare=function(component){
// 	this.room.addFacComponentTask(component,COMMODITIES[product].components[component]*10-this.store[component]);
// }

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

// var rawMaterial={
// 	//从ter转入fac,不做
// 	"W2S2":{"energy":2000,"L":1000,"H":1000,"O":1000,"K":1000,"U":1000,"Z":1000,"X":1000},
// 	"E1S5":{"silicon":1000,"mist":1000,"metal":1000,"biomass":1000},
// 	"E5S1":{"energy":2000,"wire":1000,"condensate":1000,"alloy":1000,"cell":1000},
// 	"E5S2":{"energy":2000,"mist":1000,"condensate":1000,"concentrate":500,"biomass":1000,"cell":200,"phlegm":200},
// 	"E6S2":{"energy":2000,"H":1000,"X":1000,"Z":1000,"tissue":50,"phlegm":50}
// }
// var rawStoMaterial={
// 	//从sto转入fac,不做
// 	"E5S1":{"L":1000},
// 	"E5S2":{},
// 	"E6S2":{}
// }
// var terFacBlcMaterial={
// 	//ter与fac转入转出，要做,不需要fac等级的
// 	"E5S1":{"lemergium_bar":1000,"oxidant":1000,"keanium_bar":1000,"reductant":1000,"utrium_bar":1000,"zynthium_bar":1000,"condensate":1000,"cell":1000,"wire":1000,"alloy":1000},
// 	"E5S2":{"reductant":1000,"oxidant":1000,"keanium_bar":1000,"condensate":1000,"cell":1000},
// 	"E6S2":{"reductant":1000,"purifier":1000,"zynthium_bar":1000}
// }
var stoTerBlcMaterial={
	//sto与ter转入转出，不做,不需要fac等级的
	"W2S2":{"lemergium_bar":1000,"oxidant":1000,"keanium_bar":1000,"zynthium_bar":1000,"reductant":1000,"utrium_bar":1000,"purifier":1000},
	"E5S1":{"L":1000}
}
var fac2TerMaterial={
	//fac转出到ter,要做
	"E1S5":{
		"wire":1000,"condensate":1000,"alloy":1000,"cell":1000
	},
	"E5S1":{
		"switch":100,"concentrate":100,"tube":100,"phlegm":100
	},
	"E5S2":{
		"transistor":30,"extract":20,"fixtures":30,"tissue":100
	},
	"E6S2":{
		"microchip":1,"spirit":1,"frame":100,"muscle":100
	},
	"W2S2":{"lemergium_bar":1000,"zynthium_bar":1000,"reductant":1000,"oxidant":1000,"keanium_bar":1000,"utrium_bar":1000,"purifier":1000}
}

StructureFactory.prototype.work=function(){
	// console.log("df"+this.effects[0]);
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
				if(returnValue==ERR_BUSY||returnValue==ERR_INVALID_TARGET){
					this.pushPowerTask();
				}else{
					return 0;
				}
			}
		}catch(err){
			console.log(product)
		}
	}

	// for(let product in terFacBlcMaterial[this.room.name]){
	// 	let rawOK=true;
	// 	for(let component in COMMODITIES[product].components){
	// 		if(this.store[component]<COMMODITIES[product].components[component]) rawOK=false;
	// 	}
	// 	if(rawOK){
	// 		let returnValue=this.produce(product);
	// 		if(returnValue==OK||returnValue==ERR_TIRED){
	// 			return 0;
	// 		}
	// 	}
	// }


	// if(this.store[component]<COMMODITIES[product].components[component]){
	// 	this.prepare(product)
	// 	this.room.addFacComponentTask(component,COMMODITIES[product].components[component]*10-this.store[component]);
	// 	state='prepare';
	// }

	// if(Memory.factory[this.room.name]!="work"){
	// 	for(let product in fac2TerMaterial[this.room.name]){
	// 		this.prepare(product);
	// 	}
	// }
	// else if(Memory.factory[this.room.name]=="work"){
	//
	// }

	// for(let product in fac2TerMaterial[this.room.name]){
	// 	let rawOK=true;
	// 	for(let component in COMMODITIES[product].components){
	// 		//this.store[component]中资源不存在，Undefined，或数量较小。置rawOK为false
	// 		if(!this.store[component]||this.store[component]<COMMODITIES[product].components[component]) rawOK=false;
	// 	}
	// 	if(rawOK){
	// 		let returnValue=this.produce(product);
	// 		if(returnValue==ERR_BUSY||returnValue==ERR_INVALID_TARGET){
	// 			this.pushPowerTask();
	// 		}else{
	// 			return 0;
	// 		}
	// 	}
	// }

}




StructureFactory.prototype.checkItem=function(){
	let roomname=this.room.name;

	//检查存储的原料和产物，合适的时候推送任务（terminal有就取到factory）
	// for(let resourceType in rawMaterial[roomname]){
	// 	let resourceNum=rawMaterial[roomname][resourceType];
	// 	if(this.store[resourceType]<resourceNum&&this.room.terminal.store[resourceType]>=resourceNum-this.store[resourceType]){
	// 		this.pushTask(this.room.terminal.id,this.id,resourceNum-this.store[resourceType],resourceType)
	// 	}
	// }

	//检查存储的原料和产物，合适的时候推送任务（storage有就取到factory）
	//只是用于E5S1 Lbar 的合成
	// for(let resourceType in rawStoMaterial[roomname]){
	// 	let resourceNum=rawStoMaterial[roomname][resourceType];
	// 	if(this.store[resourceType]<resourceNum&&this.room.storage.store[resourceType]>=resourceNum-this.store[resourceType]){
	// 		this.pushTask(this.room.storage.id,this.id,resourceNum-this.store[resourceType],resourceType)
	// 	}
	// }

	//terminal和factory 数量平衡，
	// for(let resourceType in terFacBlcMaterial[roomname]){
	// 	let resourceNum=terFacBlcMaterial[roomname][resourceType];
	// 	if(this.store[resourceType]>=2*resourceNum){
	// 		this.pushTask(this.id,this.room.terminal.id,resourceNum,resourceType);
	// 	}else if(this.store[resourceType]<resourceNum&&this.room.terminal.store[resourceType]>=resourceNum){
	// 		//factory存量小于1000，storage存量大于1000，移回factory
	// 		this.pushTask(this.room.terminal.id,this.id,resourceNum,resourceType);
	// 	}
	// }

	//storage和terminal 数量平衡，
	for(let resourceType in stoTerBlcMaterial[roomname]){
		let resourceNum=stoTerBlcMaterial[roomname][resourceType];
		if(this.room.terminal.store[resourceType]>=2*resourceNum){
			this.pushTask(this.room.terminal.id,this.room.storage.id,resourceNum,resourceType);
		}else if(this.room.terminal.store[resourceType]<resourceNum&&this.room.storage.store[resourceType]>=resourceNum){
			//factory存量小于1000，storage存量大于1000，移回factory
			this.pushTask(this.room.storage.id,this.id,resourceNum,resourceType);
		}
	}

	//产物从factory移到terminal
	for(let resourceType in fac2TerMaterial[roomname]){
		let resourceNum=fac2TerMaterial[roomname][resourceType];
		if(this.store[resourceType]>=resourceNum){
			this.pushTask(this.id,this.room.terminal.id,resourceNum,resourceType);
		}
	}

}
