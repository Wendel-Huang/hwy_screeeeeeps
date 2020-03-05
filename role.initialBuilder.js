module.exports = {
    run: function(creep) {
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
              const exit = creep.pos.findClosestByRange(route[0].exit);
              creep.moveTo(exit,{reusePath:300,visualizePathStyle: {stroke: '#ffffff'}});
          }
          if(Game.flags['importantFlag']){
                creep.moveTo(Game.flags['importantFlag'],{visualizePathStyle: {stroke: '#ffffff'}});
                console.log(creep.memory.role+',heading to flag')
            }
        }
    }
};
