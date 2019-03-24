var roleAttacker = {
    run: function(creep) {
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length) {
            var target = creep.pos.findClosestByRange(hostiles);
//            console.log(hostiles);
//            console.log(target);
            
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.say('Chasing');
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleAttacker;