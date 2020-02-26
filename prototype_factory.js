

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
			console.log("pushTask factoryNeedOperate")
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

var rawMaterial={
	//从ter转入fac,不做
	"E5S1":{"energy":2000,"K":1000,"O":1000,"H":1000,"mist":1000,"condensate":1000,"biomass":1000},
	"E5S2":{"energy":2000,"K":1000,"O":1000,"H":1000,"mist":1000,"condensate":1000,"concentrate":500,"biomass":1000,"cell":200,"phlegm":200},
	"E6S2":{"energy":2000,"H":1000,"X":1000,"Z":1000,"tissue":50,"phlegm":50}
}
var rawStoMaterial={
	//从sto转入fac,不做
	"E5S1":{"L":1000},
	"E5S2":{},
	"E6S2":{}
}
var stoFacMaterial={
	//sto与fac转入转出，要做,不需要fac等级的
	"E5S1":{"lemergium_bar":1000,"oxidant":1000,"keanium_bar":1000,"reductant":1000,"condensate":1000,"cell":1000},
	"E5S2":{"reductant":1000,"oxidant":1000,"keanium_bar":1000,"condensate":1000,"cell":1000},
	"E6S2":{"reductant":1000,"purifier":1000,"zynthium_bar":1000}
}
var fac2TerMaterial={
	//fac转出到ter,要做
	"E5S1":{
		// "phlegm":500
	},
	"E5S2":{"tissue":50,"extract":100},
	"E6S2":{"muscle":20},
}

StructureFactory.prototype.work=function(){
	// console.log("df"+this.effects[0]);
	if(Game.time%5==0){
		//每5tick检查原料，推送任务
		this.checkItem();
	}

	for(let product in stoFacMaterial[this.room.name]){
		let rawOK=true;
		for(let component in COMMODITIES[product].components){
			if(this.store[component]<COMMODITIES[product].components[component]) rawOK=false;
		}
		if(rawOK){
			let returnValue=this.produce(product);
			if(returnValue==OK||returnValue==ERR_TIRED){
				return 0;
			}
		}
	}

	for(let product in fac2TerMaterial[this.room.name]){
		let rawOK=true;
		for(let component in COMMODITIES[product].components){
			//this.store[component]中资源不存在，Undefined，或数量较小。置rawOK为false
			if(!this.store[component]||this.store[component]<COMMODITIES[product].components[component]) rawOK=false;
		}
		if(rawOK){
			let returnValue=this.produce(product);
			if(returnValue==ERR_BUSY||returnValue==ERR_INVALID_TARGET){
				this.pushPowerTask();
			}else{
				return 0;
			}
		}
	}

}




StructureFactory.prototype.checkItem=function(){
	let roomname=this.room.name;

	//检查存储的原料和产物，合适的时候推送任务（terminal有就取到factory）
	for(let resourceType in rawMaterial[roomname]){
		let resourceNum=rawMaterial[roomname][resourceType];
		if(this.store[resourceType]<resourceNum&&this.room.terminal.store[resourceType]>=resourceNum-this.store[resourceType]){
			this.pushTask(this.room.terminal.id,this.id,resourceNum-this.store[resourceType],resourceType)
		}
	}

	//检查存储的原料和产物，合适的时候推送任务（storage有就取到factory）
	for(let resourceType in rawStoMaterial[roomname]){
		let resourceNum=rawStoMaterial[roomname][resourceType];
		if(this.store[resourceType]<resourceNum&&this.room.storage.store[resourceType]>=resourceNum-this.store[resourceType]){
			this.pushTask(this.room.storage.id,this.id,resourceNum-this.store[resourceType],resourceType)
		}
	}

	//storage和factory 数量平衡，
	for(let resourceType in stoFacMaterial[roomname]){
		let resourceNum=stoFacMaterial[roomname][resourceType];
		if(this.store[resourceType]>2*resourceNum){
			this.pushTask(this.id,this.room.storage.id,resourceNum,resourceType);
		}else if(this.store[resourceType]<resourceNum&&this.room.storage.store[resourceType]>resourceNum){
			//factory存量小于1000，storage存量大于1000，移回factory
			this.pushTask(this.room.storage.id,this.id,resourceNum,resourceType);
		}
	}

	//产物从factory移到terminal
	for(let resourceType in fac2TerMaterial[roomname]){
		let resourceNum=fac2TerMaterial[roomname][resourceType];
		if(this.store[resourceType]>resourceNum){
			this.pushTask(this.id,this.room.terminal.id,resourceNum,resourceType);
		}
	}

}
//
// StructureFactory.prototype.checkItem=function(){
// 	//检查存储的原料和产物，合适的时候推送任务
// 	if(this.store.energy<10000&&this.room.terminal.store.energy>10000){
// 		this.pushTask(this.room.terminal.id,this.id,1000,'energy');
// 	}
// 	if(this.store.L<1000&&this.room.storage.store.L>1000){
// 		this.pushTask(this.room.storage.id,this.id,1000,'L');
// 	}
// 	if(this.store.K<1000&&this.room.terminal.store.K>1000){
// 		this.pushTask(this.room.terminal.id,this.id,1000,'K');
// 	}
// 	if(this.store.O<1000&&this.room.terminal.store.O>1000){
// 		this.pushTask(this.room.terminal.id,this.id,1000,'O');
// 	}
// 	if(this.store.biomass<1000&&this.room.storage.store.biomass>1000){
// 		this.pushTask(this.room.storage.id,this.id,1000,'biomass');
// 	}
// 	if(this.store.mist<1000&&this.room.storage.store.mist>1000){
// 		this.pushTask(this.room.storage.id,this.id,1000,'mist');
// 	}
//
// 	//多余的BAR，移到storage
// 	if(this.store.keanium_bar>2000){
// 		this.pushTask(this.id,this.room.storage.id,1000,'keanium_bar');
// 	}else if(this.store.keanium_bar<1000&&this.room.storage.store.keanium_bar>1000){
// 		//factory存量小于1000，storage存量大于1000，移回factory
// 		this.pushTask(this.room.storage.id,this.id,1000,'keanium_bar');
// 	}
// 	if(this.store.lemergium_bar>2000){
// 		this.pushTask(this.id,this.room.storage.id,1000,'lemergium_bar');
// 	}else if(this.store.lemergium_bar<1000&&this.room.storage.store.lemergium_bar>1000){
// 		//factory存量小于1000，storage存量大于1000，移回factory
// 		this.pushTask(this.room.storage.id,this.id,1000,'lemergium_bar');
// 	}
// 	if(this.store.oxidant>2000){
// 		this.pushTask(this.id,this.room.storage.id,1000,'oxidant');
// 	}else if(this.store.oxidant<1000&&this.room.storage.store.oxidant>1000){
// 		//factory存量小于1000，storage存量大于1000，移回factory
// 		this.pushTask(this.room.storage.id,this.id,1000,'oxidant');
// 	}
//
//
//
// 	//基础产物大于1k,移到terminal
// 	if(this.store.condensate>1000){
// 		this.pushTask(this.id,this.room.terminal.id,1000,'condensate');
// 	}
// 	//一级产物大于100，移到terminal
// 	if(this.store.phlegm>100){
// 		this.pushTask(this.id,this.room.terminal.id,100,'phlegm');
// 	}
// }
//
// StructureFactory.prototype.work=function(){
// 	// console.log("df"+this.effects[0]);
// 	if(Game.time%5==0){
// 		//每5tick检查原料，推送任务
// 		this.checkItem();
// 	}
// 	// if(this.store.oxidant>=36&&this.store.cell>=20){
// 	// 	if(this.produce(RESOURCE_PHLEGM)==ERR_BUSY){
// 	// 		this.pushPowerTask();
// 	// 	}
// 	// }
// 	else if(this.store.lemergium_bar>=20&&this.store.biomass>=100){
// 		this.produce(RESOURCE_CELL);
// 	}
// 	else if(this.store.keanium_bar>=20&&this.store.mist>=100){
// 		this.produce(RESOURCE_CONDENSATE);
// 	}
// 	else if(this.store.L>=500){
// 		this.produce(RESOURCE_LEMERGIUM_BAR);
// 	}
//   else if(this.store.K>=500){
// 		this.produce(RESOURCE_KEANIUM_BAR);
// 	}
//   else if(this.store.O>=500){
// 		this.produce(RESOURCE_OXIDANT);
// 	}
//
// }
