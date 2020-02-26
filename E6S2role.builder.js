//


var roleBuilder = {
    run: function(creep) {
        // var cpu1=Game.cpu.getUsed();
        // var cpu2=Game.cpu.getUsed();
        // if(cpu2-cpu1>0.1){
        //     console.log(cpu1-cpu2)
        //     console.log(creep.room)
        // }
        // console.log(typeof creep.memory.reachflag == 'undefined')
        // if(creep.memory.reachmiddle==0){
        //     creep.moveTo(Game.flags.middleflag)
        //     if(creep.pos.isEqualTo(Game.flags.middleflag)) creep.memory.reachmiddle=1;
        // }
        if(/*creep.memory.reachmiddle==1&&*/creep.room.name!=creep.memory.workroom){
            creep.moveTo(Game.flags['Flag'+creep.memory.workroom]);
        }
        if(creep.room.name==creep.memory.workroom){
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('build');
            }

            const storage=creep.room.storage;
            const terminal=creep.room.terminal;
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(creep.memory.building) {

                if(target) {
                    //有未build好的
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    creep.withdraw(terminal, RESOURCE_ENERGY)
                }
                else{
                    //已build好，upgrade controller
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else{
                // if(creep.withdraw(containers[creep.memory.sourceindex], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(containers[creep.memory.sourceindex]);
                // }

                // var targets = creep.room.find(FIND_STRUCTURES, {
                //         filter: (structure) => {
                //             return (structure.structureType == STRUCTURE_SPAWN)
                //         }
                // });
                // if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(targets[0]);
                // }

                // var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if(terminal){
                    if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                }

                // if(storage){
                //     if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(storage);
                //     }
                // }
            }
        }
        // if(typeof creep.memory.reachflag == 'undefined'){
        //    console.log(creep.moveTo(Game.flags['Flag'+creep.memory.workroom]));
        //    if(creep.pos.roomname==Game.flags['Flag'+creep.memory.workroom].pos.roomname && creep.pos.x==Game.flags['Flag'+creep.memory.workroom].pos.x && creep.pos.y==Game.flags['Flag'+creep.memory.workroom].pos.y) creep.memory.reachflag=1;
        // }else{

        // }
    }
};

module.exports = roleBuilder;
