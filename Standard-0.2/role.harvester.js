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
        
	    if(creep.memory.harvesting) {
            var source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });

            if (!targets.length) {
                targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity || 
                                structure.structureType == STRUCTURE_STORAGE && structure.store.energy < structure.storeCapacity});
            }
            
            if (targets.length) {
                var target = creep.pos.findClosestByPath(targets);
                
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
/*
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
        */
	}
};

module.exports = roleHarvester;