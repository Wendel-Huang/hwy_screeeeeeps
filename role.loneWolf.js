module.exports={
    run:function(creep){
        creep.heal(creep);
        if(creep.memory.needBoost==true){
            if(!creep.pos.isEqualTo(Game.flags["boostWaitFlag"])){
                creep.moveTo(Game.flags["boostWaitFlag"],{reusePath:51});
            }
            //检测是否已boost好
            let boosted=true;
            for(let i=0;i<creep.body.length;i++){
                if(!creep.body[i].boost) boosted=false;
            }
            if(boosted) creep.memory.needBoost=false;
        }
        else if(!creep.pos.isEqualTo(Game.flags["flagMassAttack"])){
            creep.moveTo(Game.flags["flagMassAttack"],{reusePath:300});
        }else{
            creep.rangedMassAttack();
        }
    }
}
