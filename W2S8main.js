module.exports = {
    run: function(roomname){
        var roleHarvester = require(roomname+'role.harvester');
        var roleUpgrader = require(roomname+'role.upgrader');
        var roleBuilder = require(roomname+'role.builder');
        var roleHarvesterWORKREP = require(roomname+'role.harvesterWORKREP');
        var roleTransfer=require(roomname+'role.transfer');
        var roleTransfersmall=require('role.transfersmall');

        // if(!Game.spawns['Spawn'+roomname]){
        // //spawn未建
        //     if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
        //         Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'WorkerB'+Game.time,
        //         {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
        //     }
        // }





        if(Game.spawns['Spawn'+roomname]){
            // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom=='E2S5'&&creep.memory.withdrawcorx==41&&creep.memory.givecorx==40).length<1){
            //     Game.spawns['Spawn'+roomname].spawnCreep([CARRY,
            //                                         MOVE], 'TS '+Game.time+' E2S5',
            //     {memory: {role: 'transfersmall',withdrawroom:'E2S5',withdrawcorx:41,withdrawcory:43,givecorx:40,givecory:43}});
            // }

            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'builder'&&creep.memory.workroom==roomname).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([4,4,4], 'WorkerB'+Game.time,
            //     {memory: {role: roomname+'builder',building: false,workroom:roomname,reachmiddle:0}});
            // }


            // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.transferType=='ZH'&&creep.memory.withdrawroom=='W2S8'&&creep.memory.withdrawcorx==26&&creep.memory.givecorx==24).length<1){
            //     Game.spawns['SpawnW2S8'].spawnCreep([CARRY,
            //                                         MOVE], 'TS '+Game.time+' W2S8',
            //     {memory: {role: 'transfersmall',withdrawroom:'W2S8',transferType:'ZH',withdrawcorx:26,withdrawcory:41,givecorx:24,givecory:40}});
            // }

            //升级
            // if(_.filter(Game.creeps, (creep) => creep.memory.role == roomname+'upgrader'&&creep.memory.workroom==roomname&&creep.ticksToLive>150).length<2){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([10,1,4], 'WorkerU'+Game.time, 
            //         {memory: {role: roomname+'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname}}
            //         );
            // }
    

            //采集，运输
            

            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1).length<1){
                Game.spawns['Spawn'+roomname].mySpawnCreep([5,1,0], 'WR'+Game.time+roomname,
                {directions:[BOTTOM_LEFT],memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:1}});
            }

            // if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==1).length<1){
            //     Game.spawns['Spawn'+roomname].mySpawnCreep([0,5,5], 'TS '+Game.time+roomname,
            //     {memory: {role: roomname+'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:1}});
            // }
            if( _.filter(Game.creeps, (creep) => creep.memory.role == roomname+'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2).length<1){
                Game.spawns['Spawn'+roomname].mySpawnCreep([5,1,0], 'WR'+Game.time+roomname,
                {directions:[BOTTOM],memory: {role: roomname+'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
            }

            //拾取、填充
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom==roomname).length<1){
                Game.spawns['Spawn'+roomname].spawnCreep([CARRY,CARRY,CARRY,
                                                  MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time, 
                    {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:roomname}}
                    );
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
            if(creep.memory.role == roomname+'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == roomname+'harvesterWORKREP') {
                roleHarvesterWORKREP.run(creep);
            }
        }


    }
}
