module.exports = {
    run:function(tower){
        // if(tower.room.find(FIND_HOSTILE_CREEPS).length>0){
        //     var target=tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //     tower.attack(target);
        // }
        if(tower.room.find(FIND_HOSTILE_CREEPS).length>0){
            var targets=tower.room.find(FIND_HOSTILE_CREEPS);
            var attackIndex=Math.floor(targets.length*Math.random());
            tower.attack(targets[attackIndex]);

        }
        else{
          if(Game.time%10==0){
            var targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return  ((structure.structureType == STRUCTURE_CONTAINER)&&(structure.hits<200000))
                }
            });
            tower.repair(targets[0]);
             var injuriedcreeps = tower.room.find(FIND_MY_CREEPS, {
                 filter: (creep) => {
                     return   ( creep.hits<creep.hitsMax )
                 }
             });
             if(injuriedcreeps[0]){
                 tower.heal(injuriedcreeps[0]);
             }
             var injuriedPowerCreeps=tower.room.find(FIND_MY_POWER_CREEPS, {
                 filter: (creep) => {
                     return   ( creep.hits<creep.hitsMax )
                 }
             });
             if(injuriedPowerCreeps[0]){
                 tower.heal(injuriedPowerCreeps[0]);
             }
          }

        }
    }
};
