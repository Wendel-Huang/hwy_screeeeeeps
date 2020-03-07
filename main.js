var roleHarvester = require('role.harvester');
var roleHarvesterD = require('role.harvesterD');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawnBuilder = require('role.SPAWNbuilder');
var roleHarvesterWORKREP = require('role.harvesterWORKREP');
var roleTransfer=require('role.transfer');
var roleTransferD=require('role.transferD');
var roleTransfersmall=require('role.transfersmall');
var roleTower=require('role.tower');
var roleClaimer=require('role.claimer');
var roleClaimerReal=require('role.claimerReal');
var roleLink=require('role.link');
var roleUpgradersmall = require('role.upgradersmall');
var roleAttacker=require('role.attacker')
var roleMineralWORKREP=require('role.mineralWORKREP')
var roleMineralTransfer=require('role.mineralTransfer')
var startup0=require('startup0')
var startup1=require('startup1')
var startup2=require('startup2')
var rolePickuper=require('role.pickuper')
var roleHealer=require('role.healer')
var roleRangedAttacker=require('role.attacker_ranged')
var roleLoneWolf=require('role.loneWolf')
var roleWartransfer=require('role.wartransfer')
var rolePowertransfer=require('role.powertransfer');
var roleRepairer=require('role.repairer')
var roleCenterTransfer=require('role.centerTransfer')
var roleBigHarvester=require('role.bigHarvester')
var roleFiller=require('role.filler')
var roleSigner=require('role.signer')

var W2S2=require('W2S2main')
var E5S2=require('E5S2main')
var E2S5=require('E2S5main')
var E1S5=require('E1S5main')
var E6S2=require('E6S2main')

var energyRoom = require('energyRoom')
var shoucao = require('shoucao')

require('prototype_creep')
require('prototype_globalFunction')
require('prototype_room')
require('prototype_factory')
require('prototype_powerCreep')
require('prototype_powerSpawn')
require('prototype_terminal')
require('prototype_lab')
require('structureCache')

//observer
var roomArray=['E0N0','E1N0','E2N0','E3N0','E4N0','E5N0','E6N0','E7N0','E8N0','E9N0','E10N0','E0S0','E1S0','E2S0','E3S0','E4S0','E5S0','E6S0','E7S0','E8S0','E9S0','E10S0','E10S1','E10S2','E10S3'
,'E0S1','E0S2','E0S3','E0S4','E0S5','E0S6','E0S7','E0S8','E0S9','W0S1','W0S2','W0S3','W0S4','W0S5','W0S6','W0S7','W0S8','W0S9'
,'W4N0','W3N0','W2N0','W4S0','W3S0','W2S0'];
var roomArrayE5S1=['E0N0','E1N0','E2N0','E3N0','E4N0','E5N0','E6N0','E7N0','E8N0','E9N0','E10N0','E0S0','E1S0','E2S0','E3S0','E4S0','E5S0','E6S0','E7S0','E8S0','E9S0','E10S0','E10S1','E10S2','E10S3'];
var roomArrayE1S5=['E0S1','E0S2','E0S3','E0S4','E0S5','E0S6','E0S7','E0S8','E0S9','W0S1','W0S2','W0S3','W0S4','W0S5','W0S6','W0S7','W0S8','W0S9'];
var roomArrayW2S2=['W4N0','W3N0','W2N0','W4S0','W3S0','W2S0'];

if(!Memory.factory) Memory.factory={};
if(!Memory.share) Memory.share={};

module.exports.loop = function () {
    mainLoop();
}


function mainLoop(){
    // actionCounter.init();

    // startup1.run('E1S5')
    // startup1.run('W3S3')
    // startup1.run('E6S2')
    // startup1.run('E6S2')
    // window.onkeyup = keyf;
    // actionCounter.init();

    shoucao.run();

    energyRoom.run('W3S3');
    energyRoom.run('W2S8');

    W2S2.run('W2S2')
    E5S2.run('E5S2')
    E2S5.run('E2S5')
    E1S5.run('E1S5')
    E6S2.run('E6S2')

    // //通知
    // // Memory.lastHourValue=0
    // if (typeof Memory.lastHourValue=='undefined') {
    //     Memory.lastHourValue=0;
    // }
    // if (typeof Memory.lastControllerPoint=='undefined') {
    //     Memory.lastControllerPoint=Game.gcl.progress;
    // }
    // Memory.nowHourValue=new Date().getHours();
    // Memory.storageStore=Game.structures['5dfe9588fe6041af9192590c'].store.energy;//storage energy存量给spawn内存
    // if (Memory.lastHourValue!=Memory.nowHourValue) {
    //     Memory.lastHourValue=Memory.nowHourValue;
    //     var increase=Game.gcl.progress-Memory.lastControllerPoint
    //     var terminalenergy=Game.rooms['E5S1'].terminal.store.getUsedCapacity('energy');
    //     Memory.lastControllerPoint=Game.gcl.progress;
    //     var myNotice='increase:'+increase+
    //         '   storage:'+Memory.storageStore+
    //         '   terminal:'+terminalenergy+'\n'+
    //         '   credits:'+Game.market.credits+
    //         '   progress:'+Game.gcl.progress+'\n'+
    //         '   progressTotal:'+Game.gcl.progressTotal+'\n'+
    //         'Time:'+new Date().toLocaleTimeString()+'+8hours  '+'\n'+
    //         'level:'+Game.gcl.level+
    //         '   cpu_bucket:'+Game.cpu.bucket
    //     console.log(myNotice);
    //     // Game.notify(myNotice);
    // }

    //market自动
    // var orders=Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
    // var highPrice=0;
    // var transactionCost=0;
    // var highPrice_TransactionCost=0;
    // var calcuPrice=0;
    // var highI=0;
    // var terminalenergy=Game.rooms['E5S1'].terminal.store.getUsedCapacity('energy');
    // for(i=0;i<orders.length;i++){
    //     transactionCost=Game.market.calcTransactionCost(10000, 'E5S1', orders[i].roomName)/10000;
    //     // console.log(transactionCost);
    //     calcuPrice=orders[i].price/(1+transactionCost);
    //     // console.log(calcuPrice);
    //     if(calcuPrice>highPrice){
    //         highPrice=calcuPrice;
    //         highPrice_TransactionCost=transactionCost;
    //         highI=i;
    //     }
    // }
    // console.log(highPrice_TransactionCost);
    // console.log(highPrice+' '+orders[highI].roomName);
    // if((terminalenergy>150000&&highPrice>0.02)){
    //   Game.market.deal(orders[highI].id, (terminalenergy-150000)/(1+highPrice_TransactionCost), "E5S1");
    // }
    // if((terminalenergy>50000&&highPrice>0.03)){
    //   Game.market.deal(orders[highI].id, (terminalenergy-50000)/(1+highPrice_TransactionCost), "E5S1");
    // }
    // if(highPrice>0.035){
    //   Game.market.deal(orders[highI].id, (terminalenergy)/(1+highPrice_TransactionCost), "E5S1");
    // }

    // const startCpu = Game.cpu.getUsed();
    // global.sellEnergy('E5S1')
    global.sellEnergy('E1S5')
    global.sellEnergy('E2S5')
    global.sellEnergy('W2S2')
    global.sellEnergy('W2S8')
    global.sellEnergy('E5S2')
    global.sellEnergy('E6S2')
    global.sellEnergy('W3S3')
    //market 商品
    // global.sellItem(21,'condensate','E5S1');
    // global.sellItem(14000,'muscle','E6S2');
    // global.sellItem(7500,'spirit','E6S2');
    // const elapsed = Game.cpu.getUsed() - startCpu;
    // console.log('It has used '+elapsed+' CPU time');

    global.attackedTimer(roomArray);

    // myCreateOrder(5000,0.05,'O','W2S2')
    // myCreateOrder(5000,0.05,'H','W2S2')
    // myCreateOrder(5000,0.05,'Z','W2S2')
    // myCreateOrder(5000,0.05,'K','W2S2')
    // myCreateOrder(5000,0.05,'U','W2S2')
    // myCreateOrder(5000,0.05,'L','W2S2')
    // myCreateOrder(5000,0.12,'X','W2S2')



    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    //一键买低于某价格的resource
    // buyItemUnderPrice('XLHO2',2.7,'E5S1')

    //market
    var ordersPower=Game.market.getAllOrders({type: ORDER_SELL, resourceType: 'power'});
    var lowI=0;
    var lowPrice=10;
    for(i=0;i<ordersPower.length;i++){
        if(ordersPower[i].price<lowPrice&&ordersPower[i].amount>0){
            lowPrice=ordersPower[i].price;
            lowI=i;
        }
    }
    // console.log(ordersPower[lowI].price)
    if(Game.rooms['E5S1'].terminal.store.power<2000&&lowPrice<=3.5){
        Game.market.deal(ordersPower[lowI].id, ordersPower[lowI].amount, "E5S1");
    }
    if(Game.rooms['E5S1'].terminal.store.power<10000&&lowPrice<=3){
        Game.market.deal(ordersPower[lowI].id, ordersPower[lowI].amount, "E5S1");
    }
    if(Game.rooms['E5S1'].terminal.store.power<30000&&lowPrice<=2.5){
        Game.market.deal(ordersPower[lowI].id, ordersPower[lowI].amount, "E5S1");
    }
    if(Game.rooms['E5S1'].terminal.store.power<100000&&lowPrice<=2){
        Game.market.deal(ordersPower[lowI].id, ordersPower[lowI].amount, "E5S1");
    }

    //E6S2 E5S2 power
    if(Game.rooms.E6S2.terminal.store.power<2000&&Game.rooms.E5S1.terminal.store.power>2000){
        Game.rooms.E5S1.terminal.send("power",1000,"E6S2");
    }
    if(Game.rooms.E5S2.terminal.store.power<2000&&Game.rooms.E5S1.terminal.store.power>2000){
        Game.rooms.E5S1.terminal.send("power",1000,"E5S2");
    }

    for(let i=0;i<roomArray.length;i++){
      if(!Memory.roomAttacked[roomArray[i]]){
        if(Game.flags['Deposit'+roomArray[i]]){
            if(roomArrayE1S5.indexOf(roomArray[i])!=-1){
                spawnDepositWorker(roomArray[i],'E1S5','SpawnE1S5');
            }
            else if(roomArrayE5S1.indexOf(roomArray[i])!=-1){
                spawnDepositWorker(roomArray[i],'E5S1','Spawn3');
            }
            else if(roomArrayW2S2.indexOf(roomArray[i])!=-1){
                spawnDepositWorker(roomArray[i],'W2S2','SpawnW2S2');
            }
        }
      }
    }







    //spawn mineral运输者
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'mineralTransfer'&&creep.memory.workroom=='E5S1').length<Game.flags['MFlagE5S1'].memory.containMineral){
        Game.spawns['Spawn1'].mySpawnCreep([0,4,4], 'TS'+Game.time,
        {memory: {role: 'mineralTransfer',workroom:'E5S1'}});
    }
    //spawn mineral旁边采集者
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'mineralWORKREP'&&creep.memory.workroom=='E5S1').length<Game.flags['MFlagE5S1'].memory.containMineral){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'WR'+Game.time,
        {memory: {role: 'mineralWORKREP',send: false,workroom:'E5S1'}});
    }


    //插入一行spawn 大升级者
    // if(Game.rooms['E5S1'].controller.ticksToDowngrade<100000&&_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&&creep.memory.workroom=='E5S1').length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([1,1,1], 'WorkerU'+Game.time,
    //         {direction:[LEFT],memory: {role: 'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:'E5S1'},directions:[LEFT]}
    //         );
    // }//插入一行spawn 大升级者
    //link运输
    //link To storage
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'centerTransfer'&&creep.memory.withdrawroom=='E5S1').length<1){
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                            MOVE], 'TS '+Game.time+' E5S1',
        {memory: {role: 'centerTransfer',withdrawroom:'E5S1'}});
    }




    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom=='E5S1'&&creep.memory.withdrawcorx==16&&creep.memory.givecorx==14).length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([0,10,10], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfersmall',withdrawroom:'E5S1',withdrawcorx:16,withdrawcory:24,givecorx:14,givecory:21}});
    // }

    //lab transfer
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.withdrawroom=='E5S1'&&creep.memory.givecorx==15).length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([0,2,2], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfersmall',withdrawroom:'E5S1',transferType:'energy',withdrawcorx:16,withdrawcory:24,givecorx:15,givecory:22}});
    // }



     //spawn捡起者(兼职extension运输)
    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'pickuper'&&creep.memory.workroom=='E5S1').length<1){
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                          MOVE,MOVE,MOVE,MOVE], 'WorkerPickuper'+Game.time,
            {memory: {role: 'pickuper',send: false,reachmiddle:1,workroom:'E5S1'}}
            );
    }

    //E5S1采集运输
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer'&&creep.memory.withdrawroom=='E5S1'&&creep.memory.energypoint==1).length<1){
    //     Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
    //                                       MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfer',withdrawroom:'E5S1',giveroom:'E5S1',energypoint:1}});
    // }
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom=='E5S1'&&creep.memory.workpoint==1&&creep.ticksToLive>30).length<1){
        Game.spawns['Spawn3'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'WR'+Game.time+' E5S1',
        {memory: {role: 'harvesterWORKREP',send: false,workroom:'E5S1',workpoint:1}});
    }
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer'&&creep.memory.withdrawroom=='E5S1'&&creep.memory.energypoint==2).length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([0,4,4], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfer',withdrawroom:'E5S1',giveroom:'E5S1',energypoint:2}});
    // }
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom=='E5S1'&&creep.memory.workpoint==2&&creep.ticksToLive>30).length<1){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'WR'+Game.time+' E5S1',
        {memory: {role: 'harvesterWORKREP',send: false,workroom:'E5S1',workpoint:2}});
    }

    //spawn roleRepairer
    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'&&creep.memory.workroom=='E5S1').length<1){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
          CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
          MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'repairer'+Game.time,
        {memory: {role: 'repairer',workroom:'E5S1'}});
    }

    //spawn loneWolf
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'loneWolf').length<1){
    //     Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
    //       RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
    //       MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //       HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 'loneWolf'+Game.time,
    //     {memory: {role: 'loneWolf',needBoost:true}});
    // }

    // Memory.mypath=Game.spawns['Spawn1'].pos.findPathTo(Game.flags.middleflag2)
    // Memory.mypath=PathFinder.search(new RoomPosition(21,24,Game.spawns['Spawn1'].pos.roomName),Game.flags.middleflag2).path
    // Memory.mypath2=PathFinder.search(Game.flags.middleflag2.pos,Game.flags.FlagE6S2,{maxOps:10000,range:2}).path
    // Memory.pathrooms=['']
    // console.log(Game.cpu.bucket)

    //临时spawn attacker
    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker'&&creep.memory.role2=='small').length<100){
    //     console.log(Game.spawns['Spawn1'].spawnCreep([ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE], 'Attacker'+Game.time,
    //         {memory: {role: 'attacker',reachmiddle:0,workroom:'E2S5',role2:'small'}}
    //         ));
    // }
    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker').length<1){
    //     Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
    //                                         ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL], 'Attacker'+Game.time,
    //         {memory: {role: 'attacker',reachstop:0,workroom:'W3N5'}}
    //         );
    // }
    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'healer').length<1){
    //     Game.spawns['Spawn1'].spawnCreep([HEAL,MOVE], 'healer'+Game.time,
    //         {memory: {role: 'healer',reachmiddle:0,workroom:'E2S5'}}
    //         );
    // }
    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'wartransfer').length<1){
    //     Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
    //         CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], 'wartansfer'+Game.time,
    //         {memory: {role: 'wartransfer',reachmiddle:0,workroom:'E5S1',giveroom:'E5S1',iftransfer:false}}
    //         );
    // }

    //临时spawn powertransfer 设置middleflag2 Flagpower
    // if(_.filter(Game.creeps, (creep) => creep.memory.role == 'powertransfer').length<6){
    //     Game.spawns['SpawnE2S5'].spawnCreep([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], 'powertansfer'+Game.time,
    //         {memory: {role: 'powertransfer',reachmiddle:1,goback:false}}
    //         );
    // }

    //临时spawn 建造者

    if(Game.time%50==0){
      if(Game.rooms['E5S1'].find(FIND_CONSTRUCTION_SITES).length>0){
        if( _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&&creep.memory.workroom=='E5S1').length<1){
            Game.spawns['Spawn1'].mySpawnCreep([10,10,10], 'WorkerB'+Game.time,
            {memory: {role: 'builder',building: false,workroom:'E5S1'}});
        }
      }
    }



    //spawn harvester
    if(Game.rooms['E5S1'].controller.ticksToDowngrade<160000&&_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&&creep.memory.workroom=='E5S1').length<1){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'WorkerHS'+Game.time,
        {memory: {role: 'harvester',send: false,workroom:'E5S1'}});
    }




    //临时claimer
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'claimerReal'&&creep.memory.workroom=='W2S8').length<1){
    //     Game.spawns['SpawnE1S5'].spawnCreep([CLAIM,MOVE], 'CLAIMEW2S8'+Game.time,
    //     {memory: {role: 'claimerReal',workroom:'W2S8',reachmiddle:1}});
    // }
    //临时spawn spawn的建造者
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'spawnbuilder'&&creep.memory.workroom=='W2S8').length<2){
    //     Game.spawns['SpawnE1S5'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'WorkerB'+Game.time,
    //     {memory: {role: 'spawnbuilder',building: false,workroom:'W2S8',reachmiddle:1}});
    // }



    Game.structures['5e57b999ae4e349a3a4e9002'].myProcessPower();
    Game.structures['5e4a43ced27a6f00dd9d09c0'].myProcessPower();
    Game.structures['5e3b57de30e4a2c641a9ebc8'].myProcessPower();


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'upgradersmall') {
            roleUpgradersmall.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'spawnbuilder') {
            roleSpawnBuilder.run(creep);
        }
        else if(creep.memory.role == 'harvesterWORKREP') {
            roleHarvesterWORKREP.run(creep);
        }
        else if (creep.memory.role=='transfer') {
            roleTransfer.run(creep);
        }
        else if (creep.memory.role=='powertransfer') {
            rolePowertransfer.run(creep);
        }
        else if (creep.memory.role=='transfersmall') {
            roleTransfersmall.run(creep);
        }
        else if (creep.memory.role=='centerTransfer') {
            if(creep.ticksToLive<80&&creep.store.getUsedCapacity()==0){
                creep.suicide();
            }else{
                roleCenterTransfer.run(creep);
                // creep.centerTransfer();
            }

        }
        else if (creep.memory.role=='claimer') {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role=='claimerReal') {
            roleClaimerReal.run(creep);
        }
        else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
            // creep.heal(creep);

        }
        else if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        else if(creep.memory.role == 'rangedAttacker') {
            roleRangedAttacker.run(creep);
        }
        else if(creep.memory.role == 'loneWolf') {
            roleLoneWolf.run(creep);
        }
        else if (creep.memory.role=='mineralWORKREP') {
            roleMineralWORKREP.run(creep);
        }
        else if (creep.memory.role=='mineralTransfer') {
            roleMineralTransfer.run(creep);
        }
        else if (creep.memory.role=='pickuper') {
            rolePickuper.run(creep);
        }
        else if (creep.memory.role=='wartransfer') {
            roleWartransfer.run(creep);
        }
        else if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'harvesterD') {
            roleHarvesterD.run(creep);
        }
        else if (creep.memory.role=='transferD') {
            roleTransferD.run(creep);
        }
        else if (creep.memory.role=='repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role=='bigHarvester') {
            roleBigHarvester.run(creep);
        }
        else if (creep.memory.role=='filler') {
            roleFiller.run(creep);
        }
        else if (creep.memory.role=='signer') {
            roleSigner.run(creep);
        }
    }

    // Game.structures['5e113c037b3e97757dff5fe5'].work();


    for(var id in Game.structures){
        var mystructure=Game.structures[id];
        if(mystructure.structureType==STRUCTURE_TOWER){
            roleTower.run(mystructure);
        }
        else if(mystructure.structureType==STRUCTURE_FACTORY){
          mystructure.work();
          // else if(mystructure.room.name=='E6S2'){
          //     mystructure.prepare("muscle");
          // }
        }
        else if(mystructure.structureType==STRUCTURE_LINK){
            roleLink.run(mystructure);
        }
        else if(mystructure.structureType==STRUCTURE_TERMINAL){
            mystructure.handleFacComponentTask();
            if(Game.time%13==0){
              mystructure.terStoBalance();
              mystructure.handleShare();
            }
        }
        // else if(mystructure.structureType==STRUCTURE_LAB){
        //     // mystructure.getBoostResource();
        //     mystructure.myBoostCreep();
        // }
    }

    for(var name in Game.powerCreeps){
      // let pc=Game.powerCreeps[name];
      // if(name=="powercreep1"){
      //   pc.moveTo(new RoomPosition(23,25,'E6S2'))
      // }
      // if(name=="powercreep4"){
      //   pc.moveTo(new RoomPosition(23,25,'E6S2'))
      // }
      // if(name=='powercreep4'){
      //   var pc=Game.powerCreeps[name];
      //   if(pc.store.getUsedCapacity()<pc.store.getCapacity()){
      //     if(!pc.pos.inRangeTo(Game.flags['stealFlag'],1)){
      //       pc.moveTo(Game.flags['stealFlag'],{reusePath:300,visualizePathStyle:{}})
      //     }else{
      //       let stealObject=Game.flags['stealFlag'].pos.lookFor(LOOK_STRUCTURES)[0];
      //       pc.withdraw(stealObject,"energy");
      //     }
      //   }else{
      //     if(!pc.pos.inRangeTo(Game.flags['FlagStealBack'],1)){
      //       pc.moveTo(Game.flags['FlagStealBack'],{reusePath:300,visualizePathStyle:{}})
      //     }else{
      //       let stealBackObject=Game.flags['FlagStealBack'].pos.lookFor(LOOK_STRUCTURES)[0];
      //       pc.transfer(stealBackObject,"energy");
      //     }
      //   }
      // }else{
      //   //正常部分，测试后只保留此
      //   var pc=Game.powerCreeps[name];
      //   pc.work();
      // }
      //正常部分，测试后只保留此
      let pc=Game.powerCreeps[name];
      pc.work();
    }

    // Game.structures['5e1acd3b9e776ebd11de5d75'].boostCreep(Game.creeps['Attacker14596520']);
    // Game.spawns['SpawnW2S8'].renewCreep(Game.creeps['Attacker14596520']);




    //
    // roleLink.run(Game.structures['5e0a04bcc155efd99191d552'],'E5S1')
    // roleLink.run(Game.structures['5e55feda52c2b202b35a3e2d'],'E5S1')
    // roleLink.run(Game.structures['5e0995ab91e04fd04b3fda0f'],'E5S2')
    // roleLink.run(Game.structures['5e0e4cb7e5d0080434df77fc'],'E2S5')
    // roleLink.run(Game.structures['5e146e4b27eb82101770b51c'],'E2S5')
    // roleLink.run(Game.structures['5e110f8f39f69f77dbea1841'],'E1S5')
    // roleLink.run(Game.structures['5e155154c6101b6a0dd39db0'],'W2S8')
    // roleLink.run(Game.structures['5e1a7c27fb940e273575ec4c'],'E6S2')
    // roleLink.run(Game.structures['5e1ab44f2d333a942c72eef4'],'E6S2')

    // var newLinks=[Game.structures['5e021d1df0aef9ed5f1478d3'],Game.structures['5e09a5103e6bf230bcfca5cc'],Game.structures['5e144bbd79557c10f63fa5a2']];
    // for(let linkIndex in newLinks){
    //   let link=newLinks[linkIndex];
    //   if(link.store.getUsedCapacity('energy')>600){
    //     link.pushTask();
    //     // console.log('dfasg')
    //   }
    // }


    if(Game.time%1000==0){
        myTerBlcBuy(['ops'],[0.5],'E5S1',5000);
    }



    //factory
    // Game.structures['5e113c037b3e97757dff5fe5'].produce('oxidant');

    // Game.structures['5e113c037b3e97757dff5fe5'].pushPowerTask();

    // global.A_sendto_B('W2S2','E5S1',100000)
    // global.A_sendto_B('E5S2','E5S1',100000)
    // global.A_sendto_B('E1S5','E5S1',100000)
    // global.A_sendto_B('E2S5','E5S1',100000)


    var myrooms=['E5S1','E5S2','E6S2','W2S2','W2S8','E1S5','E2S5'];
    var roomText='cpu_bucket: '+Game.cpu.bucket;
    for(i=0;i<myrooms.length;i++){
        Game.rooms[myrooms[i]].visual.text(roomText,25,25, {color: 'green', font: 0.8})
    }

    // const startCpu = Game.cpu.getUsed();
    global.mineralFlag('E5S1');
    // const elapsed = Game.cpu.getUsed() - startCpu;
    // console.log('It has used '+elapsed+' CPU time '+Game.time);

    // const startCpu = Game.cpu.getUsed();
    // Game.structures['5e0a04bcc155efd99191d552'].pushTask();
    // const elapsed = Game.cpu.getUsed() - startCpu;
    // console.log('It has used '+elapsed+' CPU time '+Game.time);



    global.putFlag();
    global.observeRoom(roomArray);
    // actionCounter.save(1500);
    // console.log(actionCounter.ratio())

    // const startCpu = Game.cpu.getUsed();
    //此处使用CPU 0.14
    myDealBuy(50,15000,150,4000,'microchip','E6S2');
    myDealBuy(50,7000,150,4500,'spirit','E6S2');
    myDealBuy(50,15000,150,4000,'frame','E6S2');
    myDealBuy(50,15000,150,6000,'muscle','E6S2');
    // const elapsed = Game.cpu.getUsed() - startCpu;
    // console.log('It has used '+elapsed+' CPU time '+Game.time);


    //购买0级商品
    // const startCpu = Game.cpu.getUsed();
    //此处使用CPU 0.14
    if(Game.time%10==0){
        let terminal=Game.rooms['E5S1'].terminal;
        let comLowLevel=["wire","condensate","alloy","cell"];
        let comHighLevel=["switch","concentrate","tube","phlegm"];
        let depoCanAccptPrc=[15,15,15,30];
        for(let i=0;i<comLowLevel.length;i++){
            if(terminal.store[comLowLevel[i]]<4000&&terminal.store[comHighLevel[i]]<400){
                let createAmount=4000-terminal.store[comLowLevel[i]];
                myCreateOrder(createAmount,depoCanAccptPrc[i],comLowLevel[i],'E5S1');
            }

        }
    }
    myDealSell(15,10000,"wire","E5S1");
    myDealSell(15,10000,"condensate","E5S1");
    myDealSell(15,10000,"alloy","E5S1");
    myDealSell(25,10000,"cell","E5S1");
    // const elapsed = Game.cpu.getUsed() - startCpu;
    // console.log('It has used '+elapsed+' CPU time '+Game.time);



    if(Game.time%1000==0){
        cancelEmptyOrders();
    }

    if(Game.time%20==0){
        //hardcode 非主房送deposit
        Game.rooms['E1S5'].terminal.sendWhenReady('biomass',1000,'E5S1');
        Game.rooms['E1S5'].terminal.sendWhenReady('metal',1000,'E5S1');
        Game.rooms['W2S2'].terminal.sendWhenReady('silicon',1000,'E5S1');
        Game.rooms['W2S2'].terminal.sendWhenReady('metal',1000,'E5S1');

        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed()
        Memory.stats['cpu.bucket'] = Game.cpu.bucket
        Memory.stats['control.process'] = Game.rooms["E5S1"].controller.progress
        Memory.stats['control.processW2S2'] = Game.rooms["W2S2"].controller.progress
        Memory.stats['control.processE1S5'] = Game.rooms["E1S5"].controller.progress
        Memory.stats['control.processE2S5'] = Game.rooms["E2S5"].controller.progress
        Memory.stats['control.processE5S2'] = Game.rooms["E5S2"].controller.progress
        Memory.stats['control.processE6S2'] = Game.rooms["E6S2"].controller.progress
        Memory.stats['control.processW2S8'] = Game.rooms["W2S8"].controller.progress
        Memory.stats['control.gcl'] = Game.gcl.progress
        Memory.stats['creeplength.length'] = Object.keys(Game.creeps).length
        Memory.stats['storage.energy'] = Game.rooms['E5S1'].storage.store['energy']
        Memory.stats['storage.energyE5S2'] = Game.rooms['E5S2'].storage.store['energy']
        Memory.stats['storage.energyW2S2'] = Game.rooms['W2S2'].storage.store['energy']
        Memory.stats['storage.energyE2S5'] = Game.rooms['E2S5'].storage.store['energy']
        Memory.stats['storage.energyE1S5'] = Game.rooms['E1S5'].storage.store['energy']
        Memory.stats['storage.energyE6S2'] = Game.rooms['E6S2'].storage.store['energy']
        Memory.stats['terminal.mistE5S1'] = Game.rooms['E5S1'].terminal.store['mist']
        Memory.stats['terminal.biomassE5S1'] = Game.rooms['E5S1'].terminal.store['biomass']
        Memory.stats['terminal.siliconE5S1'] = Game.rooms['E5S1'].terminal.store['silicon']
        Memory.stats['terminal.metalE5S1'] = Game.rooms['E5S1'].terminal.store['metal']
        Memory.stats['storage.cell'] = Game.rooms['E5S1'].storage.store['cell']
        Memory.stats['storage.condensate'] = Game.rooms['E5S1'].storage.store['condensate']
        Memory.stats['storage.wire'] = Game.rooms['E5S1'].storage.store['wire']
        Memory.stats['storage.alloy'] = Game.rooms['E5S1'].storage.store['alloy']
        Memory.stats['terminal.energyE5S1'] = Game.rooms['E5S1'].terminal.store['energy']
        Memory.stats['terminal.energyE5S2'] = Game.rooms['E5S2'].terminal.store['energy']
        Memory.stats['terminal.energyE6S2'] = Game.rooms['E6S2'].terminal.store['energy']
        Memory.stats['terminal.energyE1S5'] = Game.rooms['E1S5'].terminal.store['energy']
        Memory.stats['terminal.energyE2S5'] = Game.rooms['E2S5'].terminal.store['energy']
        Memory.stats['terminal.energyW2S2'] = Game.rooms['W2S2'].terminal.store['energy']
        Memory.stats['terminal.energyW2S8'] = Game.rooms['W2S8'].terminal.store['energy']

        Memory.stats['terminal.power'] = Game.rooms['E5S1'].terminal.store['power']

        Memory.stats['credits'] = Game.market.credits;
    }

    //
    // actionCounter.save(1500);
    // console.log(actionCounter.ratio())
}
