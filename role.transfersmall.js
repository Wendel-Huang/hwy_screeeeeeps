var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.givecorx=18;
        // creep.memory.givecory=16;
        // creep.moveTo(29,24)
        if(typeof creep.memory.transferType!='undefined'){
            if(creep.memory.iftransfer && creep.store.getUsedCapacity() == 0) {
                 creep.memory.iftransfer = false;
                 creep.tickSuicide(250);
            }
            if(!creep.memory.iftransfer && creep.store.getUsedCapacity() > 0) {
                creep.memory.iftransfer = true;
            }
            if(creep.memory.iftransfer) {
                var target = creep.room.lookForAt('structure', creep.memory.givecorx,creep.memory.givecory);
                if(creep.transfer(target[0], creep.memory.transferType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
                }
            }
            else{
                if (creep.room.name!=creep.memory.withdrawroom) {
                    creep.moveTo(new RoomPosition(17,6, creep.memory.withdrawroom),{visualizePathStyle: {stroke: '#ffaa00'}});
                }
                else{
                    var target = creep.room.lookForAt('structure', creep.memory.withdrawcorx,creep.memory.withdrawcory)[0];
                    // console.log(target)
                    if(creep.withdraw(target, creep.memory.transferType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }

        }else{
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
                  var terminal = creep.room.terminal;
                  var storage = creep.room.storage;
                  var target;
                  if(terminal.store.energy<storage.store.energy){
                    target=terminal;
                  }else{
                    target=storage;
                  }

                  // var target = Game.rooms[creep.memory.withdrawroom].lookForAt('structure', creep.memory.givecorx,creep.memory.givecory)[0];
                  if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(target);
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
                    var target = Game.rooms[creep.memory.withdrawroom].lookForAt('structure', creep.memory.withdrawcorx,creep.memory.withdrawcory);
                    if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0]);
                    }
                }
            }
        }

    }
};

module.exports = roleUpgrader;
