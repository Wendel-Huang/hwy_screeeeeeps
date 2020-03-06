module.exports={
    run:function(creep){
        let source0=Game.getObjectById(creep.room.memory.sourceIds[0]);
        let source1=Game.getObjectById(creep.room.memory.sourceIds[1]);
        let source;

        if(source0.energy>0) source=source0;
        else source=source1;

        if(creep.store.getFreeCapacity()>30){
            if(creep.harvest(source)==ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }else{
            let terminal=creep.room.terminal;
            if(creep.transfer(terminal,"energy")==ERR_NOT_IN_RANGE){
                creep.moveTo(terminal);
            }
        }

    }
}
