var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.reachmiddle=0
        if(creep.memory.reachmiddle==0){
            creep.moveTo(Game.flags.middleflag2, {visualizePathStyle: {stroke: '#ffaa00'}},{reusePath:150})
            if(creep.pos.isEqualTo(Game.flags.middleflag2)) creep.memory.reachmiddle=1;
        }else{
            if(creep.memory.goback){
                //goback真，已满，返回
                var storage=Game.rooms['E5S1'].storage;
                if(creep.transfer(storage, RESOURCE_POWER) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage,{reusePath:150});
                }
                if(creep.store.getUsedCapacity()==0){
                    if(Game.spawns['Spawn1'].recycleCreep(creep)==ERR_NOT_IN_RANGE){
                        creep.moveTo(Game.spawns['Spawn1'])
                    }
                }
            }else{
                //goback不存在或假，去采集
                if(!Game.flags['Flagpower'].room||creep.room.name!=Game.flags['Flagpower'].room.name){
                    creep.moveTo(Game.flags['Flagpower'],{reusePath:150});
                }else{
                    var powers=creep.room.lookForAt('resource',Game.flags['Flagpower'])
                    if(creep.pickup(powers[0])==ERR_NOT_IN_RANGE){
                        creep.moveTo(powers[0],{reusePath:150});
                    }
                    if(creep.pickup(powers[0])==OK){
                        creep.memory.goback=true;
                        creep.memory.reachmiddle=0;
                    }
                }
            }
        }        
    }
};

module.exports = roleUpgrader;