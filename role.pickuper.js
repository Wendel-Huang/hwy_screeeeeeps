var rolePickuper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
            var targetSET = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_EXTENSION))&&(structure.energy<structure.energyCapacity))||((structure.structureType == STRUCTURE_TOWER)&&structure.store.getUsedCapacity('energy')<800);
                    }
            });
            if(targetSET){
            // extension tower需要energy
                if(creep.store.getUsedCapacity('energy')>0){
                //creep store非空
                    if(creep.transfer(targetSET,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(targetSET);
                    }
                }else{
                //creep store空
                    let storage=creep.room.storage;
                    let terminal=creep.room.terminal;
                    let target;
                    try{
                        if(storage.store.getUsedCapacity('energy')>terminal.store.getUsedCapacity('energy')){
                            target=storage;
                        }else{
                            target=terminal;
                        }
                    }
                    catch(err){
                        // console.log(err);
                        target=terminal;
                    }
                    if(creep.withdraw(target,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                }
            }else{
            //spawn extension tower不需要energy
                if(_.sum(creep.carry)==0){
                    creep.memory.send=false;
                }
                if(!creep.memory.send&&creep.store.getUsedCapacity()< 50) {
                    const targetTOMB = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                            filter: (tomb) => {
                                return (tomb.store.getUsedCapacity('energy') > 20) ;
                            }
                    });
                    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: (resource) => {
                                return (resource.amount > 20) ;
                            }
                    });
                    // const structures = Game.flags['MCFlag'+creep.memory.workroom].pos.lookFor(LOOK_STRUCTURES);
                    if(targetTOMB) {
                        for(const resourceType in targetTOMB.store) {
                            if(creep.withdraw(targetTOMB, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targetTOMB, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 23});
                            }
                        }
                        // creep.say('tob0')
                        // creep.say(creep.withdraw(targetTOMB))
                    }
                    else if(target){
                        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{reusePath: 23});
                        }
                    }
                    // else if(structures[0].store.getUsedCapacity('energy')>20){
                    //     //mineral container energy 清理
                    //     if(creep.withdraw(structures[0],'energy') == ERR_NOT_IN_RANGE) {
                    //         creep.moveTo(structures[0],{reusePath: 23});
                    //     }
                    // }
                    else{
                        creep.moveTo(Game.flags['FlagRest'+creep.memory.workroom],{reusePath: 23})
                    }
                }
                else {
                    creep.memory.send=true;
                    var target = creep.room.terminal;
                    if(!target){
                        target=creep.room.storage;
                    }
                    for(const resourceType in creep.store) {
                        if(creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 23});
                        }
                    }
                }
            }

        }

	}
};

module.exports = rolePickuper;
