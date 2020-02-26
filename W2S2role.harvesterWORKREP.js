var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var myflag = Game.flags[creep.memory.workroom+'TSS'+creep.memory.workpoint];
        if(myflag.room){
            var targets = myflag.room.lookForAt('structure',myflag);            
        }else{
            console.log(myflag)
        }
        // var targets = creep.room.find(FIND_STRUCTURES, {
        //                 filter: (structure) => {
        //                     return (structure.structureType == STRUCTURE_CONTAINER)||(structure.structureType == STRUCTURE_LINK)
        //                 }
        //         });
        var source=creep.pos.findClosestByRange(FIND_SOURCES)
        if(creep.carry.energy<20){
            creep.memory.fill=false;
        }
        if(!creep.memory.fill&&creep.carry.energy < creep.carryCapacity) {
            if(targets[0]){
                //container正常
                // Memory.container[creep.memory.workroom]=1
                if(creep.pos.isEqualTo(targets[0])){
                    creep.harvest(source);
                }else{
                    creep.moveTo(myflag);
                    creep.say('container')
                }
            }else{
                // Memory.container[creep.memory.workroom]=0
                //container已衰减完
                // console.log('container dead')
            }

        }
        else {
            creep.memory.fill=true;
            if (targets[0].hits<230000) {
                creep.repair(targets[0]);
            }else{
                if(targets.length!=0){
                    creep.harvest(source);
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;