var roleClaimer = {
    run: function(creep) {
        // creep.memory.reachmiddle=0
        /*if(creep.memory.reachmiddle==0){
            creep.moveTo(Game.flags.middleflag, {visualizePathStyle: {stroke: '#ffaa00'}})
            if(creep.pos.isEqualTo(Game.flags.middleflag)) creep.memory.reachmiddle=1;
        }*/
        if(/*creep.memory.reachmiddle==1&&*/creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
            if(creep.room.controller) {
                creep.moveTo(creep.room.controller);
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        // else{
        //     if(creep.memory.reachmiddle==1&&creep.room.name!=creep.memory.workroom){
        //        creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        //     }else{ 
        //         if(creep.room.controller) {
        //             if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(creep.room.controller);
        //             }
        //         }           
                  
        //     }
        // }
        
	}
};

module.exports = roleClaimer;