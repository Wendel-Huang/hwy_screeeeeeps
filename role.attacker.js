var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // const path1 = Game.rooms[''].findPath(spawn, source);
      // creep.moveByPath(path);
      // creep.memory.workroom='W5S8'
      creep.memory.reachstop=0
      // if(creep.hits<creep.hitsMax){
      if(creep.memory.reachstop==0){
        creep.heal(creep);
        creep.moveTo(Game.flags.flagstop,{reusePath:300,visualizePathStyle: {stroke: '#ffaa00'}})
      }
      // creep.heal(creep);
       
      // if(creep.memory.reachstop==0){
      //   creep.moveTo(Game.flags.flagstop,{reusePath:300,visualizePathStyle: {stroke: '#ffaa00'}})
      //   // console.log(creep.moveByPath(Memory.mypath))
      //   // if(creep.pos.isEqualTo(Game.flags.middleflag2)) creep.memory.reachmiddle=1;
      // }
      if(creep.memory.reachstop==1&&creep.room.name!=creep.memory.workroom){
          creep.moveTo(Game.flags['Flag'+creep.memory.workroom],{reusePath:300});
          // creep.moveByPath(Memory.mypath2)
      }
      else if(creep.memory.reachstop==1&&creep.room.name==creep.memory.workroom){
        // const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if(target) {
        //   if(creep.attack(target) == ERR_NOT_IN_RANGE||creep.attack(target) == ERR_NO_BODYPART) {
        //       creep.moveTo(target,{reusePath:10});
        //   }
        // }
        const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_SPAWN)
          }}
        );
        if(target) {
          // console.log(creep.dismantle(target))
          if(creep.attack(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target,{reusePath:10});
          }
        }
      }  
    }
};

module.exports = roleBuilder;