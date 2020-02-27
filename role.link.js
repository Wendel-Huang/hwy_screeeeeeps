module.exports = {
    run:function(link){
        let flags=link.pos.lookFor(LOOK_FLAGS);
        try{
            if(flags[0]){
                if(flags[0].name==(link.room.name+"LF1")||flags[0].name==(link.room.name+"LF2")){
                    if (link.energy>600) {
                        let LDflags=Game.flags[link.room.name+'LD'];
                        let LD=LDflags.pos.lookFor('structure');
                        link.transferEnergy(LD[0]);
                    }
                }
                else if(flags[0].name==(link.room.name+"LD")){
                    if(link.store.getUsedCapacity('energy')>600){
                        link.pushTask();
                    }
                }
            }
        }catch(err){
            console.log(err+link.room.name)
        }
    }
};
