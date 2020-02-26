var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.say(creep.memory.giveroom+" "+creep.memory.energypoint);
        if(creep.hits<creep.hitsMax&&creep.carry.energy==0){
            creep.suicide();
        }
        if(creep.memory.iftransfer && creep.carry.energy == 0) {
             creep.memory.iftransfer = false;
             if(creep.ticksToLive<90){
                creep.suicide();
            }
        }
        if(!creep.memory.iftransfer && creep.carry.energy == creep.carryCapacity) {
            creep.memory.iftransfer = true;
        }
        if(creep.memory.iftransfer) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_SPAWN)||(structure.structureType == STRUCTURE_EXTENSION))&&(structure.energy<structure.energyCapacity))||((structure.structureType == STRUCTURE_TOWER)&&structure.store.getUsedCapacity('energy')<400);
                    }
            });

            if(!target){
                var myflag=Game.flags[creep.memory.giveroom+'TSD'];
                target=myflag.room.lookForAt('structure',myflag)[0]
            }
            // console.log(target)
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {reusePath: 20});
            }
        }
        else{
            // var myflag = Game.flags[creep.memory.withdrawroom+'TSS'+creep.memory.energypoint];
            // if(myflag.room){
            //     //有creep视野
            //     var target = myflag.room.lookForAt('structure',myflag);
            //     if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(target[0], {reusePath: 20});                       
            //     }
            // }else{
            //     //无creep视野
            //     creep.moveTo(myflag, {reusePath: 20})
            // }

            var storage=creep.room.storage;
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {reusePath: 20});                       
            }
                         
        }        
    }
};

module.exports = roleUpgrader;