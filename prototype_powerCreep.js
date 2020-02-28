PowerCreep.prototype.steal=function(){
    if(this.ticksToLive>0){
        this.usePower(PWR_GENERATE_OPS);
        if(this.store.getUsedCapacity()<100){
          if(this.ticksToLive<4500){
              if(this.renewSelf()=="noSpawn"){
                  if(!this.pos.inRangeTo(Game.flags['stealFlag'],1)){
                    this.moveTo(Game.flags['stealFlag'],{reusePath:300,visualizePathStyle:{}})
                  }else{
                    let stealObject=Game.flags['stealFlag'].pos.lookFor(LOOK_STRUCTURES)[0];
                    this.withdraw(stealObject,"energy");
                  }
              }
          }else{
              if(!this.pos.inRangeTo(Game.flags['stealFlag'],1)){
                this.moveTo(Game.flags['stealFlag'],{reusePath:300,visualizePathStyle:{}})
              }else{
                let stealObject=Game.flags['stealFlag'].pos.lookFor(LOOK_STRUCTURES)[0];
                this.withdraw(stealObject,"energy");
              }
          }
        }else{
          if(!this.pos.inRangeTo(Game.flags['FlagStealBack'],1)){
            this.moveTo(Game.flags['FlagStealBack'],{reusePath:300,visualizePathStyle:{}})
          }else{
            let stealBackObject=Game.flags['FlagStealBack'].pos.lookFor(LOOK_STRUCTURES)[0];
            for(const resourceType in this.store) {
                this.transfer(stealBackObject, resourceType);
            }
          }
        }
    }
}

PowerCreep.prototype.renewSelf=function(){
    //renew自己，优先级最高
    let powerSpawn=this.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_POWER_SPAWN }
    })[0];
    if(powerSpawn){
        if(this.renew(powerSpawn)==ERR_NOT_IN_RANGE){
            this.moveTo(powerSpawn);
        }
        return 'ok';
    }else{
        return 'noSpawn';
    }
}

PowerCreep.prototype.operateSource=function(index){
    let id=this.room.memory["sourceIds"][index];
    let source=Game.getObjectById(id);
    let returnValue=this.usePower(PWR_REGEN_SOURCE,source);
    if(returnValue==ERR_NOT_IN_RANGE){
        this.moveTo(source,{reusePath:25});
    }else if(returnValue==OK){
        Memory.powerTaskList[this.room.name].shift();
    }
}

PowerCreep.prototype.work=function(){
  if(this.ticksToLive>0){
    this.usePower(PWR_GENERATE_OPS);
    if(this.ticksToLive<500){
      //renew自己，优先级最高
      let powerSpawn=this.room.find(FIND_MY_STRUCTURES, {
          filter: { structureType: STRUCTURE_POWER_SPAWN }
      })[0];
      if(this.renew(powerSpawn)==ERR_NOT_IN_RANGE){
        this.moveTo(powerSpawn);
      }
    }
    else if(Memory.powerTaskList[this.room.name]&&Memory.powerTaskList[this.room.name].length>0){
      //任务列表有任务
      let task=Memory.powerTaskList[this.room.name][0];
      if(task==="controllerNeedEnable"){
        if(this.enableRoom(this.room.controller)==ERR_NOT_IN_RANGE){
          this.moveTo(this.room.controller);
        }else if(this.enableRoom(this.room.controller)==OK){
          Memory.powerTaskList[this.room.name].shift();
        }
      }
      else if(task==="sourceNeedOperate0"){
          this.operateSource(0);
      }
      else if(task==="sourceNeedOperate1"){
          this.operateSource(1);
      }
      else if(task==="factoryNeedOperate"){
        if(this.store.ops>=100){
          let factory=this.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_FACTORY }
          })[0];
          let returnValue=this.usePower(PWR_OPERATE_FACTORY,factory);
          if(returnValue==ERR_NOT_IN_RANGE){
            this.moveTo(factory)
          }else if(returnValue==OK){
            Memory.powerTaskList[this.room.name].shift();
          }
        }else{
          let terminal=this.room.terminal;
          if(this.withdraw(terminal,"ops",100)==ERR_NOT_IN_RANGE){
            this.moveTo(terminal);
          }
        }
      }
    }
    else{
      //任务列表无任务，于是生产ops
      if(this.store.ops==this.store.getCapacity()){
        let terminal=this.room.terminal;
        if(this.transfer(terminal,'ops')==ERR_NOT_IN_RANGE){
          this.moveTo(terminal);
        }
      }else{
        if(!this.pos.inRangeTo(Game.flags["FlagRest"+this.room.name],2)){
          this.moveTo(Game.flags["FlagRest"+this.room.name]);
        }
      }
    }
  }
}
