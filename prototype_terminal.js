StructureTerminal.prototype.handleFacComponentTask=function(){
    for(let resourceType in this.room.memory.facComponentTask){
        if(this.store[resourceType]>=this.room.memory.facComponentTask[resourceType]){
            let task={
                fromId:this.id,
          		toId:this.room.factory.id,
          		amount:this.room.memory.facComponentTask[resourceType],
                //这里可能有问题！！！！！！！！！！！！！！！！！！
          		"resourceType":resourceType
            }
            this.room.addCenterTask(task);
            break;
        }else{
            this.pushShare(resourceType,this.room.memory.facComponentTask[resourceType]-this.store[resourceType],this.room.name);
        }
    }
}

StructureTerminal.prototype.pushShare=function(resourceType,amount,destination){
    if(!Memory.share[resourceType]) Memory.share[resourceType]={"amount":amount,"destination":destination};
}


StructureTerminal.prototype.handleShare=function(){
    for(let type in Memory.share){
        if(this.store[type]>=Memory.share[type].amount&&this.room.name!=Memory.share[type].destination){
            if(this.send(type,Memory.share[type].amount,Memory.share[type].destination)==OK){
                console.log(this.room.name+" send to "+Memory.share[type].destination+", "+type+":"+Memory.share[type].amount);
                delete Memory.share[type];
            }
        }
    }
}

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

StructureTerminal.prototype.sendWhenReady=function(resourceType,amount,destination){
    if(this.store[resourceType]>=amount){
        this.send(resourceType,this.store[resourceType],destination);
    }
}
