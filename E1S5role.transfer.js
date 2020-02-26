var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.givecorx=18;
        // creep.memory.givecory=16;
        // creep.memory.giveroom='E5S1'
        // creep.memory.energypoint=1
        creep.say(creep.memory.giveroom+" "+creep.memory.energypoint);
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

            if(!target){
                var myflag=Game.flags[creep.memory.giveroom+'TSD'];
                target=myflag.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)||(structure.structureType == STRUCTURE_CONTAINER)
                    }
                })
            }
            // console.log(target)
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {reusePath: 20});
            }
        }
        else{
            var myflag = Game.flags[creep.memory.withdrawroom+'TSS'+creep.memory.energypoint];
            if(myflag.room){
                //有creep视野
                var target = myflag.room.lookForAt('structure',myflag);
                var d_energy = Game.rooms[creep.memory.withdrawroom].lookForAt('energy', myflag);
                // var d_energy2 = Game.rooms[creep.memory.withdrawroom].lookForAtArea('energy', creep.memory.withdrawcory-1,creep.memory.withdrawcorx-1, creep.memory.withdrawcory+1,creep.memory.withdrawcorx+1,1);
                // console.log(d_energy[0].pos.x);
                if(d_energy[0]&&d_energy[0].amount>50){
                    // console.log(d_energy[0].amount+" "+creep.memory.withdrawroom);
                    if(creep.pickup(d_energy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(d_energy[0], {reusePath: 20});
                    }
                }
                else if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], {reusePath: 20});                       
                }
            }else{
                //无creep视野
                creep.moveTo(myflag)
            }
                         
        }        
    }
};

module.exports = roleUpgrader;