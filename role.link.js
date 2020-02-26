module.exports = {
    run:function(link,roomname){
        if (link.energy>600) {
            let LDflags=Game.flags[roomname+'LD'];
            let LD=LDflags.pos.lookFor('structure');
            // console.log(LD[0])
            link.transferEnergy(LD[0]);
            // if(Game.flags['centerLink'+roomname]){
            // 	if(link.pos.isEqualTo(Game.flags['centerLink'+roomname])){
            // 		link.pushTask();
            // 	}
            // }
        }
    }
};