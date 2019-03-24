var creepSpawner = {
    
    /** @param {int, int, int} MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS **/
    run: function(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS, MAX_ATTACKERS, MIN_TRANSPORTERS) {
        if (Game.spawns['Spawn1'].spawning || Game.spawns['Spawn1'].room.energyAvailable < 150) {
            return;
        }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        var creepID =  '(' + Game.time.toString().slice(-4) + ')';
        
/*
        console.log('Energy: ' + Game.spawns['Spawn1'].room.energyAvailable);
        console.log('Harvesters: ' + harvesters.length);
        console.log('Builders: ' + builders.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Attackers: ' + upgraders.length);
*/
        for (var room in Game.rooms) {
            if (Game.rooms[room].find(FIND_HOSTILE_CREEPS).length > attackers.length && attackers.length < MAX_ATTACKERS) {
                var spawns = Game.rooms[room].find(FIND_MY_SPAWNS)

                for (var s in spawns) {
                    if (spawns[s].room.energyAvailable >= 600) {
                        spawns[s].spawnCreep([ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH], 'Fighter ' + creepID, {memory: {role: 'attacker', cost: 1}});
                    } else if (spawns[s].room.energyAvailable >= 300) {
                        spawns[s].spawnCreep([ATTACK, RANGED_ATTACK, MOVE, TOUGH, TOUGH], 'Fighter ' + creepID, {memory: {role: 'attacker', cost: 1}});
                    }
                }
            }
        }
        
        if (harvesters.length < MIN_HARVESTERS) {
            if (Game.spawns['Spawn1'].room.energyAvailable >= 600) {
                console.log("Spawning Large Harvester #" + harvesters.length+1);
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Harvester ' + creepID, {memory: {role: 'harvester', cost: 2}});
            } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                console.log("Spawning Small Harvester #" + harvesters.length+1);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], 'Harvester ' + creepID, {memory: {role: 'harvester', cost: 1}});
            } else {
                console.log("Spawning Tiny Harvester #" + harvesters.length+1);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Harvester ' + creepID, {memory: {role: 'harvester', cost: 0}});
            }
        } else if (builders.length < MIN_BUILDERS) {
            if (Game.spawns['Spawn1'].room.energyAvailable >= 600) {
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Builder ' + creepID, {memory: {role: 'builder', cost: 2}});
            } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], 'Builder ' + creepID, {memory: {role: 'builder', cost: 1}});
            } else {
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Builder ' + creepID, {memory: {role: 'builder', cost: 1}});
            }
        } else if (upgraders.length < MIN_UPGRADERS) {
            if (Game.spawns['Spawn1'].room.energyAvailable >= 600) {
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Upgrader ' + creepID, {memory: {role: 'upgrader', cost: 2}});
            } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], 'Upgrader ' + creepID, {memory: {role: 'upgrader', cost: 1}});
            } else {
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Upgrader ' + creepID, {memory: {role: 'upgrader', cost: 1}});
            }
        } else if (transporters.length < MIN_TRANSPORTERS) {
            if (Game.spawns['Spawn1'].room.energyAvailable >= 600) {
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], 'Transporter ' + creepID, {memory: {role: 'transporter', cost: 2}});
            } else if (Game.spawns['Spawn1'].room.energyAvailable >= 300) {
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], 'Transporter ' + creepID, {memory: {role: 'transporter', cost: 1}});
            }
        }
    }

};

module.exports = creepSpawner;
