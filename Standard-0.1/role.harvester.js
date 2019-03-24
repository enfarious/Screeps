var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say("Depositing");
        } else if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say("Harvesting");
        }
        
        if (Game.spawns['Spawn1'].room.energyAvailable < Game.spawns['Spawn1'].room.energyCapacityAvailable) { //(creep.room.storage.store.energy < creep.room.storage.storeCapacity) {
    	    if(creep.memory.harvesting) {
                var sources = creep.room.find(FIND_SOURCES);
                sources.sort((a, b) => a.pos.findClosestByRange(creep.pos) - b.pos.findClosestByRange(creep.pos));
    
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    targets.sort((a, b) => a.pos.findClosestByRange(creep.pos) - b.pos.findClosestByRange(creep.pos));
                    
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        } else { // The rooms storage is all full up
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('harvesting');
    	    }
    	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.upgrading = true;
    	        creep.say('upgrading');
    	    }
    
    	    if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                var sources = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
                
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
        }
	}
};

module.exports = roleHarvester;