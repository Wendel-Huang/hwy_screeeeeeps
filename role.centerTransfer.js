var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.memory.centerTransferTask&&creep.room.memory.centerTransferTask.length){
          var fromId=creep.room.memory.centerTransferTask[0].fromId;
          var fromStru=Game.getObjectById(fromId);
          var toId=creep.room.memory.centerTransferTask[0].toId;
          var toStru=Game.getObjectById(toId);
          if(creep.store.getUsedCapacity()==0){
            var resourceType=creep.room.memory.centerTransferTask[0].resourceType;
            var resourceAmount=creep.room.memory.centerTransferTask[0].amount>creep.store.getCapacity()?creep.store.getCapacity():creep.room.memory.centerTransferTask[0].amount;
            // console.log(creep.withdraw(fromStru,resourceType,resourceAmount ))
            let returnValue=creep.withdraw(fromStru,resourceType,resourceAmount );
            if(returnValue == ERR_NOT_IN_RANGE) {
              creep.moveTo(fromStru, {reusePath: 18});
            }
            else if(returnValue==ERR_NOT_ENOUGH_RESOURCES){
                creep.room.memory.centerTransferTask.shift();
            }
          }else{
            for(const resourceType in creep.store) {
              var transReturn=creep.transfer(toStru, resourceType);
              if(transReturn == ERR_NOT_IN_RANGE) {
                  creep.moveTo(toStru, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 23});
              }
              else if(transReturn == OK){
                creep.room.updateCenterTask(creep.store.getCapacity());
              }
            }
          }
        }
    }
};

module.exports = roleUpgrader;
