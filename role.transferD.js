var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.drop('energy')
        if(creep.hits<creep.hitsMax){
          Memory.roomAttacked[creep.memory.withdrawroom]={
            creepAttackedTimer:10000
          };
        }
        if(creep.store.getFreeCapacity()==0||creep.ticksToLive<300) {
            if(creep.pos.roomName!=creep.memory.giveroom){
                creep.moveTo( new RoomPosition(25,25,creep.memory.giveroom) ,{reusePath:300});
            }else{
                const terminal=creep.room.terminal;
                for(const resourceType in creep.store) {
                    if(creep.transfer(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'},reusePath:30});
                    }
                }
            }
        }
        else{
            if(creep.pos.roomName!=creep.memory.withdrawroom){
                creep.moveTo(new RoomPosition(25,25,creep.memory.withdrawroom ),{reusePath:300});
            }else{
                const mycreeps = creep.room.find(FIND_MY_CREEPS, {
                    filter: (creep) => {
                        return (creep.memory.role == 'harvesterD')
                    }
                });
                if(mycreeps.length > 0) {
                    // console.log(mycreeps[0])
                    creep.moveTo(mycreeps[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        creep.tickSuicide(300);
    }
};

module.exports = roleUpgrader;
