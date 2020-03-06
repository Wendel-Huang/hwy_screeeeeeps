module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
            if(Game.time%50==0){
                let targetSET = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (((structure.structureType == STRUCTURE_EXTENSION))&&(structure.energy<structure.energyCapacity))||((structure.structureType == STRUCTURE_TOWER)&&structure.store.getUsedCapacity('energy')<800);
                        }
                });
                if(targetSET) creep.memory.targetId=targetSET.id;
            }

            if(creep.memory.targetId){
                let targetSET=Game.getObjectById(creep.memory.targetId);
                if(targetSET.store.getFreeCapacity("energy")==0){
                    targetSET = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (((structure.structureType == STRUCTURE_EXTENSION))&&(structure.energy<structure.energyCapacity))||((structure.structureType == STRUCTURE_TOWER)&&structure.store.getUsedCapacity('energy')<800);
                            }
                    });
                    if(targetSET){
                        creep.memory.targetId=targetSET.id;
                    }else{
                        delete creep.memory.targetId;
                    }
                }
                if(creep.store.getUsedCapacity('energy')>0){
                //creep store非空
                    if(creep.transfer(targetSET,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(targetSET,{reusePath:37});
                    }
                }else{
                //creep store空
                    let target=creep.room.terminal;
                    if(creep.withdraw(target,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(target,{reusePath:47});
                    }
                }
            }
        }

	}
};
