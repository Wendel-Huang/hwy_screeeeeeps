var roleBuilder = {
    run: function(creep) {
        if(creep.memory.reachmiddle==0){
            creep.moveTo(Game.flags.middleflag)
            if(creep.pos.isEqualTo(Game.flags.middleflag)) creep.memory.reachmiddle=1;
        }
        if(creep.memory.reachmiddle==1&&creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){            
            var storage = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE)
                            }
                    });

            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
            });
            // var cpu1=Game.cpu.getUsed();
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('build');
            }

            if(creep.memory.building) {
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
                if(storage[0]){
                    if(creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0]);
                    }    
                }else{
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }   
                }
            }
        }
    }
};

module.exports = roleBuilder;