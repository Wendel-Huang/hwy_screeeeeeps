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
                return (structure.structureType==STRUCTURE_LINK)
            }
        })

        if(creep.pos.isEqualTo(myflag)){
            //已就位
            if(links[0]){
                //link存在，无container
                if(creep.store['energy']<creep.store.getCapacity()){
                    creep.harvest(source);
                }
                if(creep.store['energy']==creep.store.getCapacity()){
                    creep.transfer(links[0], RESOURCE_ENERGY);
                    creep.harvest(source);
                }
            }
        }else{
            //未就位
            creep.moveTo(myflag);
        }
        
    }
};

module.exports = roleHarvester;