var startup = {
    run: function(roomname) {
    	// var harvesters_obj = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&&creep.memory.workroom==roomname);
	    // var builders_obj = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&&creep.memory.workroom==roomname);
	    function bodylength_cal(){
	    	var energyAvailable=Game.rooms[roomname].energyAvailable;
	    	var bodypart=new Array();
	    	bodypart[0]=''
	    	bodypart[1]='work,carry,move'
	    	for(i=2;i<=10;i++){
	    		bodypart[i]=bodypart[i-1]+','+bodypart[1];
	    	}
	    	// console.log(bodypart[Math.floor(energyAvailable/200)])
	    	return bodypart[Math.floor(energyAvailable/200)].split(',')
	    	// console.log()
	    	// console.log('lll')
	    }
	    function bodylength_cal2(){
	    	var energyAvailable=Game.rooms[roomname].energyAvailable;
	    	var bodypart=new Array();
	    	bodypart[0]=''
	    	bodypart[1]='carry,move'
	    	for(i=2;i<=10;i++){
	    		bodypart[i]=bodypart[i-1]+','+bodypart[1];
	    	}
	    	// console.log(bodypart[Math.floor(energyAvailable/200)])
	    	return bodypart[Math.floor(energyAvailable/200)].split(',')
	    }
	    function bodylength_cal3(){
	    	var energyAvailable=Game.rooms[roomname].energyAvailable;
	    	var bodypart=new Array();
	    	bodypart[0]=''
	    	bodypart[1]=''
	    	bodypart[2]='work'
	    	for(i=3;i<=15;i++){
	    		bodypart[i]=bodypart[i-1]+','+bodypart[2];
	    	}
	    	for(i=2;i<=15;i++){
	    		bodypart[i]=bodypart[i]+',carry,move';
	    	}
	    	// console.log(bodypart[Math.floor(energyAvailable/100)])
	    	return bodypart[Math.floor(energyAvailable/100)].split(',')
	    }

        if(Game.spawns['Spawn'+roomname]){
        	if(_.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&&creep.memory.workroom==roomname).length<1){
		        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal(), 'WorkerB'+Game.time,
		        {memory: {role: 'builder',building: false,workroom:roomname,reachmiddle:0}});
		    }

            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'&&creep.memory.workroom==roomname).length<1){
    	        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal3(), 'WorkerU'+Game.time, 
    	            {memory: {role: 'upgrader',reachmiddle: 1,upgrading: false,energypoint:0,workroom:roomname}}
    	            );
    	    }
    
    	    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==1).length<1){
    	        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal2(), 'TS '+Game.time+roomname,
    	        {memory: {role: 'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:1}});
    	    }
    	    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer'&&creep.memory.withdrawroom==roomname&&creep.memory.giveroom==roomname&&creep.memory.energypoint==2).length<1){
    	        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal2(), 'TS '+Game.time+roomname,
    	        {memory: {role: 'transfer',withdrawroom:roomname,giveroom:roomname,energypoint:2}});
    	    }
    
    
    	    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==1).length<1){
    	        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal(), 'WR'+Game.time+roomname,
    	        {memory: {role: 'harvesterWORKREP',send: false,workroom:roomname,workpoint:1}});
    	    }
    	    if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterWORKREP'&&creep.memory.workroom==roomname&&creep.memory.workpoint==2).length<1){
    	        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal(), 'WR'+Game.time+roomname,
    	        {memory: {role: 'harvesterWORKREP',send: false,workroom:roomname,workpoint:2}});
    	    }
    
    	    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'&&creep.memory.workroom==roomname).length<1){
		        Game.spawns['Spawn'+roomname].spawnCreep([WORK,WORK,CARRY,MOVE], 'WorkerHS'+Game.time,
		        {memory: {role: 'harvester',send: false,workroom:roomname}});
		    }    
        }
	    
	}
};

module.exports = startup;