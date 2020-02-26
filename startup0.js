var startup0 = {
    run: function(roomname) {
      // console.log("fdas")
    	// if( _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer'&&creep.memory.workroom==roomname).length<1){
	    //     console.log(Game.spawns['SpawnW2S2'].spawnCreep([CLAIM,MOVE], 'CLAIM'+Game.time,
	    //     {memory: {role: 'claimer',workroom:roomname,reachmiddle:0}}));
	    // }
	    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&&creep.memory.workroom==roomname&&creep.ticksToLive>300).length<2){
	        Game.spawns['SpawnW2S2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,MOVE], 'WorkerB'+Game.time,
	        {memory: {role: 'builder',building: false,workroom:roomname,reachmiddle:0}});
	    }
	    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgradersmall'&&creep.memory.workroom==roomname).length<1){
	    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'WorkerU'+Game.time,
	    //         {memory: {role: 'upgradersmall',reachmiddle: 0,upgrading: false,energypoint:0,workroom:roomname}}
	    //         );
	    // }
	}
};

module.exports = startup0;
