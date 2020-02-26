var roleBuilder = {
    run: function(creep) {
        if(creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
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
            }
            else{
                // var containers = creep.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_CONTAINER)
                //         }
                // });

                // const ruin=creep.room.lookForAt('ruin',38,25);
                // if(creep.withdraw(ruin[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(ruin[0]);
                // }

                var target = creep.room.terminal;
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }

                // var source = creep.pos.findClosestByPath(FIND_SOURCES);
                // if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                // }
            }
        }
    }
};

module.exports = roleBuilder;