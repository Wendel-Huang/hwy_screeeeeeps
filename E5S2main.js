module.exports = {
    run: function(roomname){
        var roleHarvester = require(roomname+'role.harvester');
        var roleUpgrader = require(roomname+'role.upgrader');
        var roleBuilder = require(roomname+'role.builder');

        var roleTransfersmall=require('role.transfersmall');



        if(Game.spawns['Spawn'+roomname]){
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                  MOVE,MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time,
                    {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:roomname}}
                    );
            }
            // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom=='E5S2'&&creep.memory.withdrawcorx==46&&creep.memory.givecorx==45).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,
            //                                         MOVE], 'TS '+Game.time+' E5S2',
            //     {memory: {role: 'transfersmall',withdrawroom:'E5S2',withdrawcorx:46,withdrawcory:7,givecorx:45,givecory:8}});
            // }

            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([10,10,10], 'WorkerB'+Game.time,
            //     {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
            // }


            //升级
            if(Game.rooms.E5S2.controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'upgrader'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].mySpawnCreep([1,1,1], 'WorkerU'+Game.time,
                    {memory: {role: roomname+'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname}}
                    );
            }


            //采集，运输
            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==1).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([0,3,3], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:1}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1&&creep.ticksToLive>30).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: 'harvesterWORKREP',send: false,workroom:roomname,workpoint:1}});
            }


            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2&&creep.ticksToLive>25).length<1){
                Game.spawns['Spawn2'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: 'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
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
