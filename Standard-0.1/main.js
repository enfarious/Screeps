var roleHarvester = require('role.harvester');
var roleTransporter = require('role.transporter');

var roleBuilder = require('role.builder');
//var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');

var roleTower = require('role.tower');
var creepSpawner = require('creep.spawner');

var MIN_UPGRADERS = 2;
var MIN_HARVESTERS = 6;
var MIN_BUILDERS = 8;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

// Spawn new creeps if needed
    creepSpawner.run(MIN_UPGRADERS, MIN_HARVESTERS, MIN_BUILDERS);

    
// Control creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
    
    var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {strutureType: STRUCTURE_TOWER}});
    //console.log("Towers: " + towers.length);
    
    if (towers.length) {
        towers.forEach(tower => roleTower.run(tower));
    }
}