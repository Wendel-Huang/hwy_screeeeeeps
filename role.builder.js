var roleBuilder = {
    run: function(creep) {
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        let withdrawTarget;
        if(storage.store.energy>terminal.store.energy){
            withdrawTarget=storage;
        }else{
            withdrawTarget=terminal;
        }
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
            creep.withdraw(withdrawTarget, RESOURCE_ENERGY);
        }
        else{
            if(creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawTarget);
            }

            // if(storage&&storage.store.getUsedCapacity('energy')>10000){
            //     if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(storage);
            //     }
            // }else{
            //    var source = creep.pos.findClosestByRange(FIND_SOURCES,{filter:function(source){
            //     return source.energy>0;
            //    }});
            //     if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            // }
        }

    }
};

module.exports = roleBuilder;
