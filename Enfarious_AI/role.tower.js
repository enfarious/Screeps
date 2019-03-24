var roleTower = {
    run: function(room, tower) {
        var targets = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        
        if (targets.length) {
            console.log("Hostile Creeps:" + targets.length);
            console.log("Tower: " + tower);
            
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        } else {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax/2
            });
            
            if(closestDamagedStructure && tower.energy >= tower.energyCapacity/4) {
                tower.repair(closestDamagedStructure);
            }
        }
    }
};

module.exports = roleTower;
