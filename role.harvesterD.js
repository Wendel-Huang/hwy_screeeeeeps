var roleHarvester = {
    run: function(creep) {
        // creep.memory.workroom='E5S1'
        if(creep.hits<creep.hitsMax){
          Memory.roomAttacked[creep.memory.workroom]={
            creepAttackedTimer:10000
          };
        }
        if(creep.pos.roomName!=creep.memory.workroom){
            creep.moveTo(new RoomPosition(25,25,creep.memory.workroom ),{reusePath:300});
            // creep.say("back");
        }else{
            if((creep.store.getFreeCapacity()>0&&creep.ticksToLive>600)){
                if(Game.flags['Deposit'+creep.memory.workroom]){
                    var deposits=Game.flags['Deposit'+creep.memory.workroom].pos.lookFor(LOOK_DEPOSITS);
                    if(creep.harvest(deposits[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(deposits[0], {visualizePathStyle: {stroke: '#ffaa00'},reusePath:33});
                    }
                }
            }
            else if(creep.store.getUsedCapacity()==0){
                if(Game.flags['Deposit'+creep.memory.workroom]){
                    var deposits=Game.flags['Deposit'+creep.memory.workroom].pos.lookFor(LOOK_DEPOSITS);
                    if(creep.harvest(deposits[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(deposits[0], {visualizePathStyle: {stroke: '#ffaa00'},reusePath:33});
                    }
                }
            }
            if(creep.store.getUsedCapacity()>0){
                const mycreeps = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
                    filter: (creep) => {
                        return (creep.memory.role == 'transferD')
                    }
                });
                if(mycreeps.length > 0) {
                    // console.log(mycreeps[0])
                    for(const resourceType in creep.store) {
                        if(creep.transfer(mycreeps[0], resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mycreeps[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;
