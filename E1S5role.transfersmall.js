var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.givecorx=18;
        // creep.memory.givecory=16;
        // creep.moveTo(29,24)
        if(creep.memory.iftransfer && creep.carry.energy == 0) {
             creep.memory.iftransfer = false;
        }
        if(!creep.memory.iftransfer && creep.carry.energy == creep.carryCapacity) {
            creep.memory.iftransfer = true;
        }
        if(creep.memory.iftransfer) {
            if (creep.room.name!=creep.memory.withdrawroom) {
                creep.moveTo(new RoomPosition(32,49, creep.memory.withdrawroom),{visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else{
                var target = Game.rooms[creep.memory.withdrawroom].lookForAt('structure', creep.memory.givecorx,creep.memory.givecory);
                if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
                } 
                // if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_FULL) {
                //     var target = Game.rooms[creep.memory.withdrawroom].lookForAt('structure', 18,16);
                //     if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(target[0]);
                //     }
                // }
            }
        }
        else{
            if (creep.room.name!=creep.memory.withdrawroom) {
                creep.moveTo(new RoomPosition(17,6, creep.memory.withdrawroom),{visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else{
                var target = Game.rooms[creep.memory.withdrawroom].lookForAt('structure', creep.memory.withdrawcorx,creep.memory.withdrawcory)[0];
                if(target.store.getUsedCapacity('energy')==0){
                    //link空
                    target=creep.room.storage;
                }
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }             
            }              
        }        
    }
};

module.exports = roleUpgrader;