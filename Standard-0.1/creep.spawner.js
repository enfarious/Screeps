var creepSpawner = {
    
    /** @param {int, int, int} MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS **/
    run: function(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS) {
        if (!Game.spawns['Spawn1'].spawning) {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            //console.log('Harvesters: ' + harvesters.length);
            //console.log('Builders: ' + builders.length);
            //console.log('Upgraders: ' + upgraders.length);
            
            if (harvesters.length < MIN_HARVESTERS) {
                //console.log("Spawning Harvester");
                if (Game.spawns['Spawn1'].room.energyAvailable >= 500) {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'harvester'});
                } else {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], null, {role: 'harvester'});
                }
            } else if (builders.length < MIN_BUILDERS || Game.spawns['Spawn1'].room.find(FIND_MY_CONSTRUCTION_SITES).length/3 > builders.length) {
                //console.log("Spawning Builder");
                if (Game.spawns['Spawn1'].room.energyAvailable >= 500) {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'builder'});
                } else {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], null, {role: 'builder'});
                }
            } else if (upgraders.length < MIN_UPGRADERS) {
                //console.log("Spawning Upgrader");
                if (Game.spawns['Spawn1'].room.energyAvailable >= 500) {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'upgrader'});
                } else {
                    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], null, {role: 'upgrader'});
                }
            }
        }
    }
};

module.exports = creepSpawner;
