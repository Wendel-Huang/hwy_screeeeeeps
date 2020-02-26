module.exports = {
    run: function(roomname){
        var roleHarvester = require(roomname+'role.harvester');
        var roleUpgrader = require(roomname+'role.upgrader');
        var roleBuilder = require(roomname+'role.builder');
        var roleHarvesterWORKREP = require(roomname+'role.harvesterWORKREP');
        var roleTransfer=require(roomname+'role.transfer');

        // var roleTransfersmall=require('role.transfersmall');
        var roleTransfersmall=require(roomname+'role.transfersmall');

        // if(!Game.spawns['Spawn'+roomname]){
        // //spawn未建
            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'WorkerB'+Game.time,
            //     {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
            // }
        // }





        if(Game.spawns['Spawn'+roomname]){
            //拾取、填充
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,
                                                  MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time,
                    {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:roomname}}
                    );
            }


            // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom==roomname&&creep.memory.withdrawcorx==23&&creep.memory.givecorx==21).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY], 'TS '+Game.time+' E1S5',
            //     {memory: {role: 'transfersmall',withdrawroom:roomname,withdrawcorx:23,withdrawcory:32,givecorx:21,givecory:32},directions:[RIGHT]});
            // }

            if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([CARRY], 'TS '+Game.time+' E1S5',
                {memory: {role: 'transfersmall',withdrawroom:roomname,withdrawcorx:23,withdrawcory:32,givecorx:23,givecory:33},directions:[RIGHT]});
            }

            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([4,4,4], 'WorkerB'+Game.time,
            //     {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
            // }


            //升级
            if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'upgrader'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].mySpawnCreep([17,1,0], 'WorkerU'+Game.time,
                    {memory: {role: roomname+'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname},directions:[LEFT]}
                    );
            }


            //采集，运输
            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:1},directions:[TOP_RIGHT]});
            }


            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==2).length<2){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:2}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2&&creep.ticksToLive>80).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'WR'+Game.time+roomname,
                {memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
            }



            //重启作用harvester
            if(Game.rooms[roomname].controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvester'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,CARRY,MOVE], 'WorkerHS'+Game.time,
                {memory: {role: roomname+'harvester',send: false,workroom:roomname}});
            }
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
            if(creep.memory.role == roomname+'transfersmall') {
                roleTransfersmall.run(creep);
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
