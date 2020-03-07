


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
    let shareTask={"amount":amount,"destination":destination};
    if(!Memory.share[resourceType]) Memory.share[resourceType]=[];
    Memory.share[resourceType].push(shareTask);
}

//每个terminal检查全局资源请求，自己存储量大于请求额，就发送
StructureTerminal.prototype.handleShare=function(){
    for(let type in Memory.share){
        let share=Memory.share[type];
        if(this.store[type]>=share[0].amount&&this.room.name!=share[0].destination){
            if(this.send(type,share[0].amount,share[0].destination)==OK){
                console.log(this.room.name+" send to "+share[0].destination+", "+type+":"+share[0].amount);
                share.shift();
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
