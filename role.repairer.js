function getRepairId(room){
    let structureWalls = room.find(FIND_STRUCTURES,{
          filter:function(obj){
              return obj.structureType==STRUCTURE_WALL||obj.structureType==STRUCTURE_RAMPART;
          }
    });
    let min=0;
    for(let i=1;i<structureWalls.length;i++){
          if(structureWalls[i].hits<structureWalls[min].hits) min=i;
    }
    return structureWalls[min].id;
}

module.exports={
  run:function(creep){
    if(creep.store.energy==0){
      let terminal=creep.room.terminal;
      let returnValue=creep.withdraw(terminal,"energy");
      if(returnValue==ERR_NOT_IN_RANGE){
        creep.moveTo(terminal,{reusePath:29});
      }else if(returnValue==OK){
        //找需要修的路是否超过10个
        let structureRoads = creep.room.find(FIND_STRUCTURES,{
          filter:function(obj){
            return obj.structureType==STRUCTURE_ROAD&&obj.hits<obj.hitsMax*0.4;
          }
        });
        if(structureRoads.length>0){
          creep.memory.mode="repairRoads";
        }else{
          //找hits最小的 rampart 或 wall
          creep.memory.mode="repairWalls";
          creep.memory.repairId=getRepairId(creep.room);
        }
      }
    }else{
      if(creep.memory.mode=="repairWalls"){
        //修墙模式
        let wall=Game.getObjectById(creep.memory.repairId);
        if(!wall){
            creep.memory.repairId=getRepairId(creep.room);
            wall=Game.getObjectById(creep.memory.repairId);
        }
        if(creep.repair(wall)==ERR_NOT_IN_RANGE){
          creep.moveTo(wall,{reusePath:29});
        }
      }else if(creep.memory.mode=="repairRoads"){
        //修路模式
        let structureRoad = creep.pos.findClosestByRange(FIND_STRUCTURES,{
          filter:function(obj){
            return obj.structureType==STRUCTURE_ROAD&&obj.hits<=obj.hitsMax*0.8;
          }
        });
        if(structureRoad){
          if(creep.repair(structureRoad)==ERR_NOT_IN_RANGE){
            creep.moveTo(structureRoad,{reusePath:29});
          }
        }else{
          //无路可修，转换为修墙模式
          creep.memory.mode="repairWalls";
        }
      }
    }
  }
}
