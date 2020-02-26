var roleUpgrader = {
    run: function(creep) {
        // creep.memory.energypoint=1
        // if(creep.memory.reachmiddle==0){
        //     creep.moveTo(Game.flags.middleflag)
        //     if(creep.pos.isEqualTo(Game.flags.middleflag)) creep.memory.reachmiddle=1;
        // }
        if(/*creep.memory.reachmiddle==1&&*/creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
            // if(creep.signController(creep.room.controller, "星星之火，可以燎原！") == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(creep.room.controller);
            // }
            // var container = creep.room.lookForAt('structure', 40,40);
            var thespawm = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN)
                    }
            });
            var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER)
                    }
            });
            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
            });
            var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION||structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity)
                    }
            });
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                 creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }
            if(creep.memory.upgrading) {
                if(tower[0]&&tower[0].store[RESOURCE_ENERGY]<900){
                    // creep.say(tower[0].store[RESOURCE_ENERGY])
                    if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower[0]);
                    }
                }
                else if(extensions[0]){
                    if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(extensions[0]);
                    }
                }else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else{
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }                                 
            }
        }        
    }
};

module.exports = roleUpgrader;
