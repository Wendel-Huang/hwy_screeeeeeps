module.exports={
  run:function(roomname){
    if(!Game.rooms[roomname].memory.sourceIds){
      let sources=Game.rooms[roomname].find(FIND_SOURCES);
      Game.rooms[roomname].memory.sourceIds=[sources[0].id,sources[1].id];
    }
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'bigHarvester'&&creep.memory.workroom==roomname&&creep.ticksToLive>62).length<1){
        Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], 'WR'+Game.time,
        {memory: {role: 'bigHarvester',workroom:roomname}});
    }
    if(Game.rooms[roomname].controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&&creep.memory.workroom==roomname).length<1){
        Game.spawns['Spawn'+roomname].spawnCreep([WORK,CARRY,MOVE], 'WorkerU'+Game.time,
            {memory: {role: 'upgrader',upgrading: false,workroom:roomname}}
            );
    }
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'filler'&&creep.memory.workroom==roomname&&creep.ticksToLive>62).length<1){
        Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'filler'+Game.time,
        {memory: {role: 'filler',workroom:roomname}});
    }
  }
}
