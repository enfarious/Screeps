var creepSpawner = {
    
    /** @param {int, int, int} MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS **/
    run: function(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS, MAX_ATTACKERS, MIN_TRANSPORTERS) {
        if (!Game.spawns['Spawn1'].spawning || Game.spawns['Spawn1'].spawning == null) {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
            var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
/*
            console.log('Harvesters: ' + harvesters.length);
            console.log('Builders: ' + builders.length);
            console.log('Upgraders: ' + upgraders.length);
            console.log('Attackers: ' + upgraders.length);
*/            
/*
            for (var room in Game.rooms) {
                if (Game.rooms[room].find(FIND_HOSTILE_CREEPS).length > attackers.length && attackers.length < MAX_ATTACKERS) {
                    var spawns = Game.rooms[room].find(FIND_MY_SPAWNS)

                    for (var s in spawns) {
                        if (spawns[s].room.energyAvailable >= 500) {
                            spawns[s].createCreep([ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH], null, {role: 'attacker', cost: 1});
                        } else if (spawns[s].room.energyAvailable >= 300) {
                            spawns[s].createCreep([ATTACK, RANGED_ATTACK, MOVE, TOUGH, TOUGH], null, {role: 'attacker', cost: 1});
                        }
                    }
                }
            }
*/            
            if (harvesters.length < MIN_HARVESTERS) {
                console.log("Spawning Harvester!");
                if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= 600) {
                    Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], null, {role: 'harvester', cost: 2});
                } else if (Game.spawns['Spawn1'].room.energyAvailable >= 400) {
                    Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], null, {role: 'harvester', cost: 1});
                } else {
                    Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], null, {role: 'harvester', cost: 1});
                }
            } else if (builders.length < MIN_BUILDERS) {
                console.log("Spawning Builder!");
                if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= 500) {
                    Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], null, {role: 'builder', cost: 2});
                } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                    Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], null, {role: 'builder', cost: 1});
                }
            } else if (upgraders.length < MIN_UPGRADERS) {
                if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= 500) {
                    Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], null, {role: 'upgrader', cost: 2});
                } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                    Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], null, {role: 'upgrader', cost: 1});
                }
            } else if (transporters.length < MIN_TRANSPORTERS) {
                if (Game.spawns['Spawn1'].room.energyCapacityAvailable >= 500) {
                    Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'transporter', cost: 2});
                } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                    Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {role: 'transporter', cost: 1});
                }
            }
        }
    }
};

module.exports = creepSpawner;
