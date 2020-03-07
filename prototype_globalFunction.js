/**
 *@param {Array of string} resourceBuyTypeArray-要买的资源类型数组
 *@param {Array of string} resourceBuyCnAccpPrcArray-相应资源购买时能接受的最高价格
 *@param {string} roomname
 *@param {number} balanceAmount
 */
global.myTerBlcBuy=function(resourceBuyTypeArray,resourceBuyCnAccpPrcArray,roomname,balanceAmount){
    let terminal=Game.rooms[roomname].terminal;
    for(let i=0;i<resourceBuyTypeArray.length;i++){
        if(terminal.store[resourceBuyTypeArray[i]]<balanceAmount){
            let createAmount=balanceAmount-terminal.store[resourceBuyTypeArray[i]];
            myCreateOrder(createAmount,resourceBuyCnAccpPrcArray[i],resourceBuyTypeArray[i],roomname);
        }
    }
}


/**
 *@param {string} resourceType
 *@param {number} resourceAmount
 */
global.costCalc=function(resourceType,resourceAmount){
    let baseResource=['O','H','Z','K','U','L','X','G','silicon','mist','metal','biomass','energy']
    let totalPrice=0;
    if(baseResource.indexOf(resourceType)==-1){
        let productAmount=COMMODITIES[resourceType].amount;
        for(let component in COMMODITIES[resourceType].components){
            let amount = resourceAmount*COMMODITIES[resourceType].components[component]/productAmount;
            totalPrice+=costCalc(component,amount);
        }
    }else{
        let avgPrice=Game.market.getHistory(resourceType)[0].avgPrice;
        totalPrice=avgPrice*resourceAmount;
    }
    return totalPrice;
}


/**
 *@param {string} resourceType
 */
global.costGainRatio=function(resourceType){
    let cost=costCalc(resourceType,1);
    let gain=Game.market.getHistory(resourceType)[0].avgPrice;
    return (cost+"/"+gain+" = "+cost/gain)
}






/**
 *@param {number} priceCanAccept
 *@param {number} limitAmount：限制买的量，使terminal中的量不超过此数
 *@param {string} resourceType
 *@param {string} roomname
 */
global.myDealSell=function(priceCanAccept,limitAmount,resourceType,roomname){

    //根据terminal存储量确定 能接受的价格-priceCanAccept
    let terminalAmount=Game.rooms[roomname].terminal.store[resourceType];

    if(terminalAmount<limitAmount){
        //计算市场SELL单中的最低价
        let marketPrice=1000000;
        let marketOrders=_.filter(Game.market.getAllOrders({type:ORDER_SELL,resourceType:resourceType}), (order) => order.remainingAmount>0);
        let lowPriceIndex=0;
        for(let i=0;i<marketOrders.length;i++){
            if(marketOrders[i].price<marketPrice){
                marketPrice=marketOrders[i].price;
                lowPriceIndex=i;
            }
        }
        //若市场价低于 priceCanAccept, 就成交
        if(marketPrice<=priceCanAccept){
            let needAmount=limitAmount-terminalAmount;
            let dealAmount = needAmount<marketOrders[lowPriceIndex].amount?needAmount:marketOrders[lowPriceIndex].amount;
            console.log("buy:"+resourceType+" price:"+marketPrice+" amount:"+dealAmount);
            Game.market.deal(marketOrders[lowPriceIndex].id,dealAmount,roomname);
        }
    }


}



/**
 *@param {number} amount1-低量
 *@param {number} price1-低量时的高价
 *@param {number} amount2
 *@param {number} price2
 *@param {string} resourceType
 *@param {string} roomname
 */
global.myDealBuy=function(amount1,price1,amount2,price2,resourceType,roomname){

    //根据terminal存储量确定 能接受的价格-priceCanAccept
    let terminalAmount=Game.rooms[roomname].terminal.store[resourceType];
    let priceCanAccept;
    if(terminalAmount<=amount1) priceCanAccept=price1;
    else if(terminalAmount>=amount2) priceCanAccept=price2;
    else priceCanAccept=price1+(price2-price1)*(terminalAmount-amount1)/(amount2-amount1);

    //计算市场BUY单中的最高价
    let marketPrice=0;
    let marketOrders=_.filter(Game.market.getAllOrders({type:ORDER_BUY,resourceType:resourceType}), (order) => order.remainingAmount>0);
    let highPriceIndex=0;
    for(let i=0;i<marketOrders.length;i++){
        if(marketOrders[i].price>marketPrice){
            marketPrice=marketOrders[i].price;
            highPriceIndex=i;
        }
    }

    if(marketPrice>priceCanAccept){
        let dealAmount = terminalAmount<marketOrders[highPriceIndex].amount?terminalAmount:marketOrders[highPriceIndex].amount;
        if(dealAmount>0){
            if(Game.market.deal(marketOrders[highPriceIndex].id,dealAmount,roomname)==OK){
                console.log("sell "+resourceType+": price-"+marketPrice+" amount-"+dealAmount);
            }
        }
    }
}





/**
 *@param {number} amount
 *@param {number} priceCanAccept
 *@param {string} resourceType
 *@param {string} roomname
 */
global.myCreateOrder=function(amount,priceCanAccept,resourceType,roomname){
    let myOrders=_.filter(Game.market.orders, (order) => order.resourceType==resourceType&&order.remainingAmount>0)
    let marketOrders=Game.market.getAllOrders({type:ORDER_BUY,resourceType:resourceType});
    let highPrice=0;
    for(let i=0;i<marketOrders.length;i++){
        if(marketOrders[i].price>highPrice) highPrice=marketOrders[i].price;
    }
    //计算计划价格，由 市场最高价决定，但不高于阈值
    let myPlanPrice = priceCanAccept<highPrice?priceCanAccept:highPrice;
    if(!myOrders.length){
        let returnValue=Game.market.createOrder({
            type:ORDER_BUY,
            resourceType:resourceType,
            price:myPlanPrice+0.001,
            totalAmount:amount,
            roomName:roomname
        })
        if(returnValue==OK){
            console.log("create order: "+resourceType+" "+myPlanPrice+" "+amount);
        }
    }
    else if(myOrders[0].price<myPlanPrice){
        console.log("change orderPrice: "+resourceType+" "+myOrders[0].price+"->"+(myPlanPrice+0.001)+", remainingAmount:"+myOrders[0].remainingAmount);
        Game.market.changeOrderPrice(myOrders[0].id,myPlanPrice+0.001);
    }
}



global.cancelEmptyOrders=function(){
    let myOrders=_.filter(Game.market.orders, (order) => order.remainingAmount==0)
    for(let i=0;i<myOrders.length;i++){
        console.log("cancelEmptyOrders: "+myOrders[i].resourceType+", total:"+myOrders[i].totalAmount)
        Game.market.cancelOrder(myOrders[i].id);
    }
}





global.spawnDepositWorker=function(depositRoom,giveRoom,spawnName){
    if(!Game.spawns[spawnName].spawning&&_.filter(Game.creeps, (creep) => creep.memory.role == 'transferD'&&creep.memory.withdrawroom==depositRoom).length<1){
        Game.spawns[spawnName].mySpawnCreep([0,10,10], 'TS '+Game.time+depositRoom,
        {memory: {role: 'transferD',withdrawroom:depositRoom,giveroom:giveRoom}});
        console.log(depositRoom+" found Deposit, prepare to spawn transferD at "+giveRoom);
    }
    //spawn deposit 采集者
    if(!Game.spawns[spawnName].spawning&&_.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterD'&&creep.memory.workroom==depositRoom).length<1){
      Game.spawns[spawnName].mySpawnCreep([20,4,20], 'WorkerHD'+Game.time+depositRoom,
      {memory: {role: 'harvesterD',send: false,workroom:depositRoom}});
      console.log(depositRoom+" found Deposit, prepare to spawn harvesterD at "+giveRoom);
    }
}

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


global.buyItemUnderPrice=function(itemType,price,roomName){
    let priceObj=getItemSellPrice(itemType);
    if(priceObj.price<=price){
        Game.market.deal(priceObj.id,priceObj.orderAmount,roomName);
    }
}

global.getItemSellPrice=function(itemType){
  // var orders=Game.market.getAllOrders({type:ORDER_BUY,resouceType:RESOURCE_ENERGY});
  var orders=Game.market.getAllOrders({type: ORDER_SELL, resourceType: itemType})
  let lowI=0;
  let priceObj={};
  for(let i=1;i<orders.length;i++){//从1开始 与0比较，
    if( (orders[i].price<orders[lowI].price&&orders[i].amount>=50) || (orders[lowI].amount<50) ){
      lowI=i;
    }
  }
  if(orders[lowI]){
    priceObj.roomName=orders[lowI].roomName;
    priceObj.orderAmount=orders[lowI].amount;
    priceObj.id=orders[lowI].id;
    priceObj.price=orders[lowI].price;
    return priceObj;
  }else{
    return null;
  }

}

global.getItemPrice=function(itemType){
  // var orders=Game.market.getAllOrders({type:ORDER_BUY,resouceType:RESOURCE_ENERGY});
  var orders=Game.market.getAllOrders({type: ORDER_BUY, resourceType: itemType})
  let highI=0;
  let priceObj={};
  for(let i=1;i<orders.length;i++){//从1开始 与0比较，
    if(orders[i].price>orders[highI].price&&orders[i].amount>0){
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
    }
    else{
      Game.flags['Deposit'+room.name].memory.lastCooldown=targets[0].lastCooldown;
    }
  }
  else{
    if(Game.flags['Deposit'+room.name]){
      Game.flags['Deposit'+room.name].remove();
      delete Memory.flags['Deposit'+room.name];
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
      for(let roomName in Memory.roomAttacked){
          if(Memory.roomAttacked[roomName].creepAttackedTimer>0){
            Memory.roomAttacked[roomName].creepAttackedTimer-=100;
          }else{
            delete Memory.roomAttacked[roomName];
          }
      }
  }
}
