var roleClaimer = {
    run: function(creep) {
        // if(creep.memory.reachmiddle==0){
        //     creep.moveTo(Game.flags.middleflag, {visualizePathStyle: {stroke: '#ffaa00'}})
        //     if(creep.pos.isEqualTo(Game.flags.middleflag)) creep.memory.reachmiddle=1;
        // }
        if(creep.room.name!=creep.memory.workroom){
          const route = Game.map.findRoute(creep.room, creep.memory.workroom, {
              routeCallback(roomName, fromRoomName) {
                if(roomName == 'W2S3') {    // 回避这个房间
                    return Infinity;
                }
                if(roomName == 'W1S2') {    // 回避这个房间
                    return Infinity;
                }
                if(roomName == 'W2S1') {    // 回避这个房间
                    return Infinity;
                }
                return 1;
          }});
          if(route.length > 0) {
              console.log('Now heading to room '+route[0].room);
              const exit = creep.pos.findClosestByRange(route[0].exit);
              creep.moveTo(exit,{reusePath:300,visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
        // if(/*creep.memory.reachmiddle==1&&*/creep.room.name!=creep.memory.workroom){
        //     creep.moveTo(new RoomPosition(25,25,Game.rooms[creep.memory.workroom]));
        // }
        if(creep.room.name==creep.memory.workroom){
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,{reusePath:50});
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
        if(Game.flags['importantFlag']){
            creep.moveTo(Game.flags['importantFlag'],{visualizePathStyle: {stroke: '#ffffff'}});
            console.log(creep.memory.role+',heading to flag')
        }

	}
};

module.exports = roleClaimer;
