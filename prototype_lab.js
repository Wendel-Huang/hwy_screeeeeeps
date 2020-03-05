StructureLab.prototype.myBoostCreep=function(){
    let targetCreep=this.room.find(FIND_MY_CREEPS,{filter: function(object) {
        return object.memory.needBoost == true;
    }
    });
    if(targetCreep[0]){
        console.log(targetCreep[0]+" is the creep")
        this.boostCreep(targetCreep[0]);
    }
}

StructureLab.prototype.getBoostResource=function(){
    if(Game.flags['lab'+this.room.name]){
        let flagx=Game.flags['lab'+this.room.name].pos.x;
        let flagy=Game.flags['lab'+this.room.name].pos.y;
        if(this.pos.x-flagx==1&&this.pos.y-flagy==0){
            this.prepare("energy");
            this.prepare("XZHO2");
        }
        if(this.pos.x-flagx==0&&this.pos.y-flagy==-1){
            this.prepare("energy");
            this.prepare("XLHO2");
        }
        if(this.pos.x-flagx==2&&this.pos.y-flagy==-1){
            this.prepare("energy");
            this.prepare("XKHO2");
        }
        if(this.pos.x-flagx==1&&this.pos.y-flagy==-2){
            this.prepare("energy");
            this.prepare("XGHO2");
        }
    }
}

StructureLab.prototype.prepare=function(type){
    console.log(this.store.getUsedCapacity(type))
    if(!this.store.getUsedCapacity(type)){
        let task={
            fromId:this.room.terminal.id,
      		toId:this.id,
      		amount:this.store.getFreeCapacity(type),
      		resourceType:type
        }
        console.log(this.room.addCenterTask(task));
    }
}
