var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        if (creep.memory.site == '') {
    	        var buildings = creep.room.find(FIND_CONSTRUCTION_SITES);
    	        
    	        if (buildings.length) {
    	            buildings.sort((a,b) => a.pos.findClosestByRange(creep.pos) - b.pos.findClosestByRange(creep.pos));
                    creep.memory.site = buildings[0].id;
    	        }
	        }

            if (creep.memory.site != '') {
                if(creep.build(Game.getObjectById(creep.memory.site)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.site));
                }

    	        if (!Game.getObjectById(creep.memory.site)) {
    	            creep.memory.site = '';
    	        }
	        } else { // nothing needs to be built
	            buildings = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
	            
	            if (buildings.length) {
	                buildings.sort((a,b) => a.hits - b.hits);
	                if (creep.repair(buildings[0]) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(buildings[0]);
	                }
	            } else { // nothing needs to be repaired either
                    if(creep.memory.upgrading && creep.carry.energy == 0) {
                        creep.memory.upgrading = false;
                        creep.say('harvesting');
            	    }
            	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            	        creep.memory.upgrading = true;
            	        creep.say('upgrading');
            	    }
            
            	    if (creep.memory.upgrading) {
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    } else {
                        var sources = creep.room.find(FIND_SOURCES);
                        sources.sort((a, b) => a.pos.findClosestByRange(creep.pos) - b.pos.findClosestByRange(creep.pos));
                        
                        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[1]);
                        }
                    }
	                
	            }
	        }
        } else {
            var sources = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));

            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
	}
};

module.exports = roleBuilder;