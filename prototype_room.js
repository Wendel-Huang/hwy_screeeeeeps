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
		console.log(this.name+" push task")
		this.memory.centerTransferTask.push(task);
	}
}

Room.prototype.updateCenterTask=function(transferAmount){
	this.memory.centerTransferTask[0].amount -= transferAmount
    if (this.memory.centerTransferTask[0].amount <= 0) {
        this.memory.centerTransferTask.shift();
        console.log(this.name+' task finished! taskLength:'+this.memory.centerTransferTask.length);
    }
}


StructureLink.prototype.pushTask=function(){
	var task={
		fromId:this.id,
		toId:this.room.terminal.id,
		amount:600,
		resourceType:'energy'
	};
	this.room.addCenterTask(task);
}
