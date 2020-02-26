var roleUpgrader = {
    run: function(creep) { 
        // creep.memory.workroom='E5S1'
        var myflag=Game.flags[creep.memory.workroom+'LD'];
        var target = myflag.room.lookForAt('structure',myflag);
        if(creep.memory.upgrading && creep.carry.energy == 0) {
             creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        if(creep.memory.upgrading) {
            // var constuction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            // creep.withdraw(target[0], RESOURCE_ENERGY);
            // if(creep.build(constuction) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(constuction, {visualizePathStyle: {stroke: '#ffffff'}});
            // }
            creep.withdraw(target[0], RESOURCE_ENERGY)
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            // if (target[0].hits<50000 && target[0].structureType=='container') {
            //     if(creep.repair(target[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
            // if(target[0].hits>=50000 || target[0].structureType!='container'){
            //     if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        }
        else{
            if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
                creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }                 
        }
    }
};

module.exports = roleUpgrader;

