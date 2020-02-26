var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name!=creep.memory.workroom) {
            creep.moveTo(new RoomPosition(32,49, creep.memory.workroom),{visualizePathStyle: {stroke: '#ffaa00'}});
        }else{
            if(creep.store.getFreeCapacity() > 0) {
                var structures=Game.flags['MCFlag'+creep.memory.workroom].pos.lookFor(LOOK_STRUCTURES);
                if(creep.withdraw(structures[0], Game.flags['MFlag'+creep.memory.workroom].memory.resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.flags['MCFlag'+creep.memory.workroom], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                if(creep.transfer(creep.room.storage, Game.flags['MFlag'+creep.memory.workroom].memory.resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }
    }
};

module.exports = roleUpgrader;
