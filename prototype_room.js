Room.prototype.addFacComponentTask=function(resouceType,amount){
	if(!this.memory.facComponentTask) this.memory.facComponentTask={};
	if(!this.memory.facComponentTask[resouceType]){
		this.memory.facComponentTask[resouceType]=amount;
	}
}


Room.prototype.addCenterTask=function(task){
	//初始化数组
	if(!this.memory.centerTransferTask) this.memory.centerTransferTask=[];
	//判断建筑是否已提交任务
	var hasTask=false;
	for(i=0;i<this.memory.centerTransferTask.length;i++){
		var aTask=this.memory.centerTransferTask[i];
		// console.log(aTask.fromId)
		if(aTask.fromId==task.fromId){
			hasTask=true;
		}
	}
	//未提交任务，提交
	if(!hasTask){
		// let fromStr=Game.getObjectById(task.fromId);
		// let toStr=Game.getObjectById(task.toId);
		// console.log(this.name+" push task "+fromStr.structureType+" to "+toStr.structureType);
		this.memory.centerTransferTask.push(task);
		return 0;
	}else{
		return -1;
	}
}

Room.prototype.updateCenterTask=function(transferAmount){
	this.memory.centerTransferTask[0].amount -= transferAmount
    if (this.memory.centerTransferTask[0].amount <= 0) {
		if(this.memory.facComponentTask&&this.memory.facComponentTask[this.memory.centerTransferTask[0].resourceType]){
			delete this.memory.facComponentTask[this.memory.centerTransferTask[0].resourceType];
		}
		this.memory.centerTransferTask.shift();
        // console.log(this.name+' task finished! taskLength:'+this.memory.centerTransferTask.length);
    }
}

Room.prototype.checkSourceEffect=function(){
	if(!this.memory["sourceIds"]){
		this.memory["sourceIds"]=[];
		let sources=this.find(FIND_SOURCES);
		for(let i=0;i<sources.length;i++){
			this.memory["sourceIds"].push(sources[i].id);
		}
		if(!Memory.powerTaskList){
			Memory.powerTaskList={};
		}
		if(!Memory.powerTaskList[this.name]){
			Memory.powerTaskList[this.name]=["controllerNeedEnable"];
		}
	}
	for(let i=0;i<this.memory["sourceIds"].length;i++){
		let id=this.memory["sourceIds"][i];
	    let source=Game.getObjectById(id);
		if(!source.effects||!source.effects[0]||source.effects[0].ticksRemaining<30){
			if(Memory.powerTaskList[this.name].indexOf("sourceNeedOperate"+i)==-1){
				Memory.powerTaskList[this.name].push("sourceNeedOperate"+i);
				console.log("pushTask sourceNeedOperate"+i)
			}
		}
	}
}
