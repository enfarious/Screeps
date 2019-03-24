var roleHarvester = require('role.harvester');
var roleTransporter = require('role.transporter');

var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var roleAttacker = require('role.attacker');
var roleTower = require('role.tower');

var creepSpawner = require('creep.spawner');

var MIN_HARVESTERS = 3;
var MIN_TRANSPORTERS = 1;

var MIN_BUILDERS = 2;
var MIN_UPGRADERS = 1;

var MIN_ATTACKERS = 0;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

// Spawn new creeps if needed
    creepSpawner.run(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS, MIN_ATTACKERS, MIN_TRANSPORTERS);

// Control creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
    
    for (var room in Game.rooms) {
        var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        if (towers.length) {
            for (var tower in towers) {
                roleTower.run(room, towers[tower]);
            }
        }
    }
}