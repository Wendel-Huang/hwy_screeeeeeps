StructurePowerSpawn.prototype.addCenterTransferTask=function(){
  if(!this.store.power||this.store.power==0){
    let task={
      fromId:this.room.terminal.id,
  		toId:this.id,
  		amount:100,
  		resourceType:"power"
    }
    this.room.addCenterTask(task);
  }
  if(this.store.energy<=3000){
    let task={
      fromId:this.room.terminal.id,
  		toId:this.id,
  		amount:1600,
  		resourceType:"energy"
    }
    this.room.addCenterTask(task);
  }
}
