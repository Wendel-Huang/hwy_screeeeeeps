module.exports={
    run:function(creep){
        if(creep.memory.workroom&&creep.room.name!=creep.memory.workroom){
            creep.moveTo(new RoomPosition(25,25,creep.memory.workroom),{reusePath:300});
        }else{
            let controller=creep.room.controller;
            let text="我是一只小青蛙~~呱~呱~呱呱呱.😀\nI'm a peace lover!Let's make friends!😀\nI can trade with you at better price.";
            let returnValue=creep.signController(controller,text);
            if(returnValue==ERR_NOT_IN_RANGE){
                creep.moveTo(controller,{reusePath:50});
            }else if(returnValue==OK){
                creep.suicide();
            }
        }
    }
}
