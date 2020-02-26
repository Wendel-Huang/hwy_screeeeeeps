var roleBuilder = {
    run: function(creep) {
        if(creep.room.name!=creep.memory.workroom){
          const route = Game.map.findRoute(creep.room, creep.memory.workroom, {
              routeCallback(roomName, fromRoomName) {
                if(roomName == 'W2S3') {    // 回避这个房间
                    return Infinity;
                }
                if(roomName == 'W1S2') {    // 回避这个房间
                    return Infinity;
                }
                if(roomName == 'W2S1') {    // 回避这个房间
                    return Infinity;
                }
                return 1;
          }});
          if(route.length > 0) {
              const exit = creep.pos.findClosestByRange(route[0].exit);
              creep.moveTo(exit,{reusePath:300,visualizePathStyle: {stroke: '#ffffff'}});
          }
          if(Game.flags['importantFlag']){
                creep.moveTo(Game.flags['importantFlag'],{visualizePathStyle: {stroke: '#ffffff'}});
                console.log(creep.memory.role+',heading to flag')
            }
        }

        if(creep.room.name==creep.memory.workroom){
            var storage = creep.room.storage;
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('build');
            }

            if(creep.memory.building) {
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    //有未build好的
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    //已build好，upgrade controller
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                creep.withdraw(storage, RESOURCE_ENERGY);
            }
            else{
                // var containers = creep.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_CONTAINER)
                //         }
                // });

                // if(creep.withdraw(ruin[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(ruin[0]);
                // }

                if(storage&&storage.store.getUsedCapacity('energy')>10000){
                    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }else{
                   var source = creep.pos.findClosestByRange(FIND_SOURCES,{filter:function(source){
                    return source.energy>0;
                   }});
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } 
                }
            }
        }
    }
};

module.exports = roleBuilder;
