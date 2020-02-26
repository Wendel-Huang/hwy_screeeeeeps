var startup1 = {
    run: function(roomname) {

    	function bodylength_cal(){
	    	var energyAvailable=Game.rooms[roomname].energyAvailable;
	    	var bodypart=new Array();
	    	bodypart[0]=''
	    	bodypart[1]='work,carry,move'
	    	for(i=2;i<=62;i++){
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
	    	// console.log()
	    	// console.log('lll')
	    }
	    if(Game.spawns['Spawn'+roomname]){
	    	if(_.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&&creep.memory.workroom==roomname).length<1){
		        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal(), 'WorkerB'+Game.time,
		        {memory: {role: 'builder',building: false,workroom:roomname,reachmiddle:0}});
		    }
		    if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgradersmall'&&creep.memory.workroom==roomname).length<3){
		        Game.spawns['Spawn'+roomname].spawnCreep(bodylength_cal(), 'WorkerU'+Game.time,
		            {memory: {role: 'upgradersmall',reachmiddle: 0,upgrading: false,energypoint:0,workroom:roomname}}
		            );
		    }
	    }
	}
};

module.exports = startup1;
