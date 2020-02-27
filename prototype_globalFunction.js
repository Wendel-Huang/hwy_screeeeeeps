global.A_sendto_B=function(Aroonname,Broomname,keepamount){
  if(Game.rooms[Aroonname].terminal.store.getUsedCapacity()>keepamount+10000){
    Game.rooms[Aroonname].terminal.send('energy',10000,Broomname)
  }
}

StructureSpawn.prototype.mySpawnCreep=function(body,name,opts){
  let bodypart='';
  for(let i=0;i<body[0];i++){
    bodypart=bodypart+'work,'
  }
  for(let i=0;i<body[1];i++){
    bodypart=bodypart+'carry,'
  }
  for(let i=0;i<body[2];i++){
    bodypart=bodypart+'move,'
  }
  bodypart=bodypart.substring(0,bodypart.length-1)
  let bodypartArray=bodypart.split(',');
  return this.spawnCreep(bodypartArray,name,opts);
}

global.getItemPrice=function(itemType){
  // var orders=Game.market.getAllOrders({type:ORDER_BUY,resouceType:RESOURCE_ENERGY});
  var orders=Game.market.getAllOrders({type: ORDER_BUY, resourceType: itemType})
  let highI=0;
  let priceObj={};
  for(let i=1;i<orders.length;i++){//从1开始 与0比较，
    if(orders[i].price>orders[highI].price){
      highI=i;
    }
  }
  if(orders[highI]){
    priceObj.roomName=orders[highI].roomName;
    priceObj.orderAmount=orders[highI].amount;
    priceObj.id=orders[highI].id;
    priceObj.price=orders[highI].price;
    return priceObj;
  }else{
    return null;
  }

}

global.sellItem=function(sellprice,itemType,roomName){
  let priceObj=global.getItemPrice(itemType);
  if(priceObj!=null){
    let myItemAmount=Game.rooms[roomName].terminal.store[itemType];//自己terminal里的量
    let amount=Math.min(myItemAmount,priceObj.orderAmount);
    if(priceObj.price>sellprice&&amount>0){
      Game.market.deal(priceObj.id,amount,roomName);
      console.log('price:'+priceObj.price+'  amount:'+amount+'  targetRoom:'+priceObj.roomName)
    }
  }
}


//market getEnergyPrice
global.getEnergyPrice=function(roomName){
  var orders=Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
  // console.log(orders.length)
  var highPrice=0;
  var transactionCost=0;
  var highPrice_TransactionCost=0;
  var calcuPrice=0;
  var highI=0;
  var priceObj={index:0,price:0,transactionCost:0};
  for(let i=0;i<orders.length;i++){
      transactionCost=Game.market.calcTransactionCost(10000, roomName, orders[i].roomName)/10000;
      calcuPrice=orders[i].price/(1+transactionCost);
      if(calcuPrice>highPrice){
          highPrice=calcuPrice;
          highPrice_TransactionCost=transactionCost;
          highI=i;
      }
  }
  priceObj.index=highI;
  priceObj.id=orders[highI].id;
  priceObj.price=highPrice;
  priceObj.transactionCost=highPrice_TransactionCost;
  return priceObj;
}

//market sell at different rooms
global.sellEnergy=function(roomName){
  var priceObjMy=global.getEnergyPrice(roomName)
  var terminalenergy=Game.rooms[roomName].terminal.store.getUsedCapacity('energy');
   var E5S1terminalEnergy=Game.rooms['E5S1'].terminal.store.getUsedCapacity('energy');
  if(E5S1terminalEnergy<110000&&terminalenergy>75000){
    Game.rooms[roomName].terminal.send('energy',10000, 'E5S1');
  }
  if((terminalenergy>280000)){
    Game.market.deal(priceObjMy.id, (terminalenergy-280000+5000)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy-280000+5000)+'   sendRoom:'+roomName)
  }
//   else if((terminalenergy>270000)){
//     if(roomName!='E5S1'){
//       Game.rooms[roomName].terminal.send('energy',(terminalenergy-265000)/(1+priceObjMy.transactionCost), 'E5S1');
//     }
//   }
  if((terminalenergy>230000&&priceObjMy.price>0.02)){
    Game.market.deal(priceObjMy.id, (terminalenergy-230000+5000)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy-230000+5000)+'   sendRoom:'+roomName)
  }
  if((terminalenergy>180000&&priceObjMy.price>0.03)){
    Game.market.deal(priceObjMy.id, (terminalenergy-180000+5000)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy-180000+5000)+'   sendRoom:'+roomName)
  }
  if((terminalenergy>100000&&priceObjMy.price>0.04)){
    Game.market.deal(priceObjMy.id, (terminalenergy-100000+5000)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy-100000+5000)+'   sendRoom:'+roomName)
  }
  if((terminalenergy>50000&&priceObjMy.price>0.05)){
    Game.market.deal(priceObjMy.id, (terminalenergy-50000+5000)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy-50000+5000)+'   sendRoom:'+roomName)
  }
  if(priceObjMy.price>0.07){
    Game.market.deal(priceObjMy.id, (terminalenergy)/(1+priceObjMy.transactionCost), roomName);
    console.log('price:'+priceObjMy.price+'  transCost:'+priceObjMy.transactionCost+'  amount:'+(terminalenergy)+'   sendRoom:'+roomName)
  }
}


global.processPower=function(){
  Game.structures['5e57b999ae4e349a3a4e9002'].processPower();
  //非energy transfer
  var terminal=Game.rooms['E5S1'].terminal;
  if(terminal.store.getUsedCapacity('energy')>95000&&terminal.store.getUsedCapacity('power')>2000){
    Game.structures['5e57b999ae4e349a3a4e9002'].addCenterTransferTask();
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.transferType=='power'&&creep.memory.withdrawroom=='E5S1'&&creep.memory.withdrawcorx==16&&creep.memory.givecorx==20).length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([0,1,1], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfersmall',withdrawroom:'E5S1',transferType:'power',withdrawcorx:16,withdrawcory:24,givecorx:20,givecory:23}});
    // }
    // if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfersmall'&&creep.memory.transferType=='energy'&&creep.memory.withdrawroom=='E5S1').length<1){
    //     Game.spawns['Spawn1'].mySpawnCreep([0,8,8], 'TS '+Game.time+' E5S1',
    //     {memory: {role: 'transfersmall',withdrawroom:'E5S1',transferType:'energy',withdrawcorx:16,withdrawcory:24,givecorx:20,givecory:23}});
    // }
  }
}


global.observeRoom=function(roomArray){
  var roomLength=roomArray.length;
  var roomToObserve=roomArray[Game.time%roomLength];
  Game.structures['5e1ac74b5b8691b4f03176ad'].observeRoom(roomToObserve);
  Memory.roomJustObserved=roomToObserve;
  // if(Game.time%2==0){
  //   Memory.roomJustObserved0=roomToObserve;
  // }
  // if(Game.time%2==1){
  //   Memory.roomJustObserved1=roomToObserve;
  // }
//   console.log(roomToObserve);
}

global.setFlag=function(room){
  var targets=room.find(FIND_DEPOSITS);
  if(targets.length&&targets[0].lastCooldown<100){
    var flags=targets[0].pos.lookFor(LOOK_FLAGS);
    if(flags.length==0){
      targets[0].pos.createFlag('Deposit'+room.name);
      Game.notify(room.name+': put deposit_flag');
    }
    else{
      Game.flags['Deposit'+room.name].memory.lastCooldown=targets[0].lastCooldown;
    }
  }
  else{
    if(Game.flags['Deposit'+room.name]){
      Game.flags['Deposit'+room.name].remove();
      Game.notify(room.name+': remove deposit_flag');
    }
  }
}

global.putFlag=function(){
  let room=Game.rooms[Memory.roomJustObserved];
  if(room){
    global.setFlag(room);
  }else {
    console.log(Memory.roomJustObserved+': cannot get roomObject');
  }
    // if(Game.time%2==0){
    //   var room=Game.rooms[Memory.roomJustObserved1];
    //   global.setFlag(room);
    // }
    // if(Game.time%2==1){
    //   var room=Game.rooms[Memory.roomJustObserved0];
    //   global.setFlag(room);
    // }
}

global.mineralFlag=function(roomName){
  if(Game.time%5==0){
    if(Game.rooms[roomName].find(FIND_MINERALS)[0].pos.lookFor(LOOK_FLAGS).length==0){
      //无flag,初始化
      Game.rooms[roomName].find(FIND_MINERALS)[0].pos.createFlag('MFlag'+roomName);
      Game.flags['MFlag'+roomName].memory.resourceType=Game.flags['MFlag'+roomName].pos.lookFor(LOOK_MINERALS)[0].mineralType;
    }else{
      if(Game.flags['MFlag'+roomName].pos.lookFor(LOOK_MINERALS)[0].mineralAmount>0){
        Game.flags['MFlag'+roomName].memory.containMineral=1;
      }else{
        Game.flags['MFlag'+roomName].memory.containMineral=0;
      }
    }
    if(!Game.flags['MCFlag'+roomName]){
      Game.rooms[roomName].find(FIND_MINERALS)[0].pos.findInRange(FIND_STRUCTURES,2,{filter:{structureType:STRUCTURE_CONTAINER}})[0].pos.createFlag('MCFlag'+roomName);
    }
  }
}

global.attackedTimer=function(roomArray){
  if(Game.time%100==0){
    for(let i=0;i<roomArray.length;i++){
      if(Memory.roomAttacked[roomArray[i]]&&Memory.roomAttacked[roomArray[i]].creepAttacked){
        if(Memory.roomAttacked[roomArray[i]].creepAttacked){
          if(Memory.roomAttacked[roomArray[i]].creepAttackedTimer>0){
            Memory.roomAttacked[roomArray[i]].creepAttackedTimer-=100;
          }else{
            Memory.roomAttacked[roomArray[i]].creepAttacked=false;
          }
        }
      }
    }
  }
}
