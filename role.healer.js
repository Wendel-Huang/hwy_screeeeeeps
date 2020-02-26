var roleHealer = {
    run: function(creep) { 
        const target2 = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        const target = Game.creeps['Attacker14048563']
        if(target) {
            creep.moveTo(target);
            if(creep.pos.isNearTo(target2)) {
                creep.heal(target2);
            }
            else {
                creep.rangedHeal(target2);
            }
        }
        if(creep.hits<creep.hitsMax-200){
            creep.heal(creep);
        }
    }
};

module.exports = roleHealer;

