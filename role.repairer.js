module.exports={
  run:function(creep){
    if(creep.store.energy==0){
      let storage=creep.room.storage;
      let returnValue=creep.withdraw(storage,"energy");
      if(returnValue==ERR_NOT_IN_RANGE){
        creep.moveTo(storage,{reusePath:29});
      }else if(returnValue==OK){
        let structureWalls = creep.room.find(FIND_STRUCTURES,{
          filter:function(obj){
            return obj.structureType==STRUCTURE_WALL||obj.structureType==STRUCTURE_RAMPART;
          }
        });
        let min=0;
        for(let i=1;i<structureWalls.length;i++){
          if(structureWalls[i].hits<structureWalls[min].hits) min=i;
        }
        creep.memory.repairId=structureWalls[min].id;
      }
    }else{
      let wall=Game.getObjectById(creep.memory.repairId);
      if(creep.repair(wall)==ERR_NOT_IN_RANGE){
        creep.moveTo(wall,{reusePath:29});
      }
    }
  }
}
