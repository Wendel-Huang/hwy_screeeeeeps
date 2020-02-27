StructureTerminal.prototype.terStoBalance=function(){
  let terEnergy=Math.max((this.store.energy-50000)*3.6,0);
  let stoEnergyMin=Math.max(this.room.storage.store.energy+50000,0);
  let stoEnergyMax=Math.max(this.room.storage.store.energy-50000,0);
  if(terEnergy>stoEnergyMin){
    let task={
      fromId:this.id,
      toId:this.room.storage.id,
      amount:2000,
      resourceType:'energy'
    }
    this.room.addCenterTask(task);
    return 0;
  }else if(terEnergy<stoEnergyMax){
    let task={
      fromId:this.room.storage.id,
      toId:this.id,
      amount:2000,
      resourceType:'energy'
    }
    this.room.addCenterTask(task);
    return 0;
  }
}
