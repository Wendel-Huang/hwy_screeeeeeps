module.exports = {
    run: function(roomname){
        var roleHarvester = require(roomname+'role.harvester');
        var roleUpgrader = require(roomname+'role.upgrader');
        var roleBuilder = require(roomname+'role.builder');
        var roleHarvesterWORKREP = require('role.harvesterWORKREP');
        var roleTransfer=require(roomname+'role.transfer');


        if(Game.spawns['Spawn'+roomname]){

            //建造
            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([10,10,10], 'WorkerB'+Game.time,
            //     {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
            // }


            //升级
            if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'upgrader'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].mySpawnCreep([15,1,2], 'WorkerU'+Game.time,
                    {memory: {role: roomname+'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname}}
                    );
            }


            //采集，运输
            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==1).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:1}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role =='harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1&&creep.ticksToLive>60).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role:'harvesterWORKREP',send: false,workroom:roomname,workpoint:1}});
            }

            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==2).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:2}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2&&creep.ticksToLive>80).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role:'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
            }

            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'centerTransfer'&&creep.memory.withdrawroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE], 'CTS '+Game.time,
                {memory: {role: 'centerTransfer',withdrawroom:roomname}});
            }

            //spawn捡起者(兼职extension运输)
           if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom==roomname).length<1){
               Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                 MOVE,MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time,
                   {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:roomname}}
                   );
           }


            //重启作用harvester
            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvester'&&creep.memory.workroom==roomname).length<1){
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
