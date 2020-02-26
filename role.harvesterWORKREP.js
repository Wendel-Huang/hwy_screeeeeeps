var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var myflag = Game.flags[creep.memory.workroom+'TSS'+creep.memory.workpoint];
        if(myflag.room){
            var containers = myflag.room.lookForAt('structure',myflag);            
        }else{
            console.log(myflag)
        }
        var source=creep.pos.findClosestByRange(FIND_SOURCES)
        var links=creep.pos.findInRange(FIND_MY_STRUCTURES,1,{
            filter: (structure)=>{
                return ((structure.structureType==STRUCTURE_LINK)||(structure.structureType==STRUCTURE_CONTAINER))
            }
        })


        if(creep.pos.isEqualTo(myflag)){
            //已就位
            if(links[0]){
                //link存在，无container
                creep.harvest(source);
                creep.transfer(links[0], RESOURCE_ENERGY);
            }
            if(containers[0].structureType==STRUCTURE_CONTAINER){
            //container存在，repair,transfer
                //判断是否满
                if(creep.store['energy']<20){
                    creep.memory.full=false;
                }
                if(creep.store['energy']==creep.store.getCapacity()){
                    creep.memory.full=true;
                }
                //满和不满的操作
                if(creep.memory.full==false){
                    creep.harvest(source);
                }
                if(creep.memory.full==true){
                    if(containers[0].hits<230000){
                        creep.repair(containers[0]);
                    }else{
                        creep.harvest(source);//transfer同时不忘harvest
                        creep.transfer(containers[0],RESOURCE_ENERGY);
                    }
                }
            } 
        }else{
            //未就位
            creep.moveTo(myflag);
        }
        
	}
};

module.exports = roleHarvester;