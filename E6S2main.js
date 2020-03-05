module.exports = {
    run: function(roomname){
        var roleHarvester = require(roomname+'role.harvester');
        var roleUpgrader = require(roomname+'role.upgrader');
        var roleBuilder = require(roomname+'role.builder');
        var roleHarvesterWORKREP = require(roomname+'role.harvesterWORKREP');
        var roleTransfer=require(roomname+'role.transfer');


        if(Game.spawns['Spawn2'+roomname]){

            //建造
            if(Game.time%100==0){
              if(Game.rooms[roomname].find(FIND_CONSTRUCTION_SITES).length>0){
                if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
                  Game.spawns['Spawn3'+roomname].spawnCreep([WORK,CARRY,MOVE], 'WorkerB'+Game.time,
                  {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
                }
              }
            }

            Game.rooms[roomname].checkSourceEffect();


            //升级
            if(Game.rooms.E6S2.controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'upgrader'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn3'+roomname].spawnCreep([WORK,CARRY,MOVE], 'WorkerU'+Game.time,
                    {memory: {role: roomname+'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname}}
                    );
            }

            // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom==roomname&&creep.ticksToLive>60).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,
            //                                         MOVE], 'TS '+Game.time+roomname,
            //     {memory: {role: 'transfersmall',withdrawroom:roomname,withdrawcorx:13,withdrawcory:25,givecorx:12,givecory:24}});
            // }


            //采集，运输
            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==1).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([0,13,13], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:1}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1&&creep.ticksToLive>90).length<1){
                Game.spawns['Spawn2'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:1}});
            }

            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==2).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([0,6,6], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:2}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2&&creep.ticksToLive>30).length<1){
                Game.spawns['Spawn1'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
            }

            //spawn roleRepairer
            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&&creep.memory.workroom == roomname).length<1){
                Game.spawns['Spawn3'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                  CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                  MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'repairer'+Game.time,
                {memory: {role: 'repairer',workroom:roomname}});
            }

            //拾取、填充
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn3'+roomname].spawnCreep([CARRY,CARRY,CARRY,
                                                  MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time,
                    {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:roomname}}
                    );
            }

            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'centerTransfer'&&creep.memory.withdrawroom=='E6S2').length<1){
                Game.spawns['Spawn3'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE], 'TS '+Game.time+' E6S2',
                {memory: {role: 'centerTransfer',withdrawroom:'E6S2'}});
            }



            //重启作用harvester
            // if(Game.rooms[roomname].controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvester'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,CARRY,MOVE], 'WorkerHS'+Game.time,
            //     {memory: {role: roomname+'harvester',send: false,workroom:roomname}});
            // }
        }


        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == roomname+'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == roomname+'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == roomname+'transfer') {
                roleTransfer.run(creep);
            }
            if(creep.memory.role == roomname+'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == roomname+'harvesterWORKREP') {
                roleHarvesterWORKREP.run(creep);
            }
        }
    }
}
