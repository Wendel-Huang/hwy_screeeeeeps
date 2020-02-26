var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources=creep.room.lookForAt('source',Game.flags[creep.memory.workroom+'H'+creep.memory.workpoint]);

        

        if(creep.store['energy']<20){
            creep.memory.full=false;
        }
        if(creep.store['energy']==creep.store.getCapacity()){
            creep.memory.full=true;
        }
        //满和不满的操作
        if(creep.memory.full==false){
            var myflag = Game.flags[creep.memory.workroom+'TSS'+creep.memory.workpoint];
            if(creep.pos.isEqualTo(myflag)){
                creep.harvest(sources[0]);
            }else{
                creep.moveTo(myflag);
            }
        }
        if(creep.memory.full==true){
            creep.harvest(sources[0]);//transfer同时不忘harvest
            var target=creep.room.terminal;
            if(creep.transfer(target,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }        
    }
};

module.exports = roleHarvester;