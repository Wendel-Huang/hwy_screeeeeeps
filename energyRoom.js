module.exports={
  run:function(roomname){
    if(!Game.rooms[roomname].memory.sourceIds){
      let sources=Game.rooms[roomname].find(FIND_SOURCES);
      let Game.rooms[roomname].memory.sourceIds=[sources[0].id,sources[1].id];
    }
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'bigHarvester'&&creep.ticksToLive>50).length<1){
        Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'WR'+Game.time,
        {memory: {role: 'bigHarvester'}});
    }
  }
}
