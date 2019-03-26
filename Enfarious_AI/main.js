const roleHarvester = require('role.harvester');
const roleTransporter = require('role.transporter');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleAttacker = require('role.attacker');
const roleTower = require('role.tower');

const creepSpawner = require('creep.spawner');

// Define minimum counts for creep types
const MIN_HARVESTERS = 3;
const MIN_TRANSPORTERS = 1;
const MIN_BUILDERS = 4;
const MIN_UPGRADERS = 2;
const MIN_ATTACKERS = 0;

/***
* The main loop
***/
module.exports.loop = function () {

    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Spawn new creeps if needed
    creepSpawner.run(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS, MIN_ATTACKERS, MIN_TRANSPORTERS);

    // Control creeps
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }

    for (let room in Game.rooms) {
        let towers = Game.rooms[room].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

        if (towers.length) {
            for (let tower in towers) {
                roleTower.run(room, towers[tower]);
            }
        }
    }
};
