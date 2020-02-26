var roleUpgrader = {
    run: function(creep) { 
        // creep.memory.workroom='E5S1'
        var myflag=Game.flags[creep.memory.workroom+'TSD'];
        var target = myflag.room.lookForAt('structure',myflag);
        if(creep.memory.upgrading && creep.carry.energy == 0) {
             creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        if(creep.memory.upgrading) {
            creep.withdraw(target[0], RESOURCE_ENERGY);
            if (target[0].hits<230000 && target[0].structureType=='container') {
                if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(target[0].hits>=230000 || target[0].structureType!='container'){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else{
            if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }                 
        }
        // creep.tickRenew2(1000,'Spawn2')
    }
};

module.exports = roleUpgrader;

