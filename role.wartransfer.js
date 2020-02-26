var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.giveroom='E5S1'
        // creep.memory.iftransfer=false;
        // creep.say(creep.memory.withdrawroom+" "+creep.memory.withdrawcorx);
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
                        return (((structure.structureType == STRUCTURE_SPAWN)||(structure.structureType == STRUCTURE_EXTENSION))&&(structure.energy<structure.energyCapacity))||((structure.structureType == STRUCTURE_TOWER)&&structure.store.getUsedCapacity('energy')<800);
                    }
            });
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
             creep.say('fds')
            var myflag=Game.flags[creep.memory.giveroom+'TSD'];
            target=myflag.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)||(structure.structureType == STRUCTURE_CONTAINER)
                }
            })
            // console.log(target)
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target/*, {reusePath: 20}*/);                       
            }            
        }        
    }
};

module.exports = roleUpgrader;