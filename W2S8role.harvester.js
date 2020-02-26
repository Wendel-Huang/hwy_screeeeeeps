var roleHarvester = {
    run: function(creep) {
        // creep.memory.workroom='E5S1'
        if(creep.pos.roomName!=creep.memory.workroom){
            creep.moveTo(new RoomPosition(45, 45,creep.memory.workroom ));
            // creep.say("back");
        }else{
            if(creep.carry.energy==0){
                creep.memory.send=false;
            }
            if(!creep.memory.send&&creep.carry.energy < creep.carryCapacity) {
                var source = creep.room.lookForAt('source',Game.flags[creep.memory.workroom+'H1'])[0];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                creep.memory.send=true;
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN||structure.structureType == STRUCTURE_EXTENSION) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(targets.length == 0) {
                    //无需填充，upgrade controller
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }    
        }
        
	}
};

module.exports = roleHarvester;