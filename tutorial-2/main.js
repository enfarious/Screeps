var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "Harvester") {
            roleHarvester.run(creep);
        } else if (creep.memory.role == "Upgrader") {
            roleUpgrader.run(creep);
        }
    }
}