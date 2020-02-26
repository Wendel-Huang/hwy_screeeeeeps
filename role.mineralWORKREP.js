

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.pos.isEqualTo(Game.flags['MCFlag'+creep.memory.workroom])){
            var structures=Game.flags['MCFlag'+creep.memory.workroom].pos.lookFor(LOOK_STRUCTURES);
            var mineral = Game.flags['MFlag'+creep.memory.workroom].pos.lookFor(LOOK_MINERALS)[0];
            creep.harvest(mineral);
        }else{
            creep.moveTo(Game.flags['MCFlag'+creep.memory.workroom], {visualizePathStyle: {stroke: '#ffaa00'}});
        }            
    }
};

module.exports = roleHarvester;