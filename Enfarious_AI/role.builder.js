var roleBuilder = {
    /** 
     *  @param {Creep} creep 
     *  This is the code for builder creeps, they should:
     *  Collect energy from storages > extensions > sources in order to
     *  Repair structures that are low on hits > Build structures currently queued
     *  Upgrade the room controller
     ***/
    run: function (creep) {
        var repairThreshold = .9;

        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.say('⚡ Harvesting');

            creep.memory.building = false;
            creep.memory.harvesting = true;
        }

        if (creep.memory.harvesting && creep.carry.energy >= creep.carryCapacity * .95) {
            creep.say('🚧 Building');

            creep.memory.building = true;
            creep.memory.harvesting = false;
        }

        // Creep has enough energy to build so lets go build
        if (creep.memory.building) {
            // Make sure the site still exists if the creep was already working on one
            if (creep.memory.site !== '' && !Game.getObjectById(creep.memory.site)) {
                creep.memory.site = '';
                creep.memory.repairing = false;
            }

            // Creep is in repair mode, if the current site still exists and is above threshold percentage stop
            if (creep.memory.site !== '' && creep.memory.repairing) {
                if (Game.getObjectById(creep.memory.site).hits / Game.getObjectById(creep.memory.site).hitsMax > repairThreshold) {
                    creep.memory.repairing = false;
                    creep.memory.site = '';
                }
            }

            // This creep isn't already working on a site so check repairs, if none needed find a site to build on
            if (creep.memory.site === '') {
                sites = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax / 3 });

                if (sites.length) {
                    sites.sort((a, b) => a.hits - b.hits);
                    creep.memory.repairing = true;
                    creep.memory.site = sites[0].id;
                } else {
                    sites = creep.room.find(FIND_CONSTRUCTION_SITES);

                    if (sites.length) {
                        sites.sort((a, b) => a.pos.findClosestByRange(creep.pos) - b.pos.findClosestByRange(creep.pos));
                        creep.memory.site = sites[0].id;
                    } else {
                        sites = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax * .9 });
                        if (sites.length) {
                            sites.sort((a, b) => a.hits - b.hits);
                            creep.memory.repairing = true;
                            creep.memory.site = sites[0].id;
                        }
                    }
                }
            }

            // If we have found a repair or construction site 
            if (creep.memory.site !== '') {
                creep.memory.building = true;

                if (creep.memory.repairing) {
                    if (creep.repair(Game.getObjectById(creep.memory.site)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.site));
                    }
                } else {
                    if (creep.build(Game.getObjectById(creep.memory.site)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.site));
                    }
                }
            } else {
                creep.memory.repairing = false;
                creep.memory.building = false;
            }
        }

        if (creep.memory.harvesting) {
            if (creep.memory.harvesting && creep.carry.energy >= creep.carryCapacity * .95) {
                creep.memory.harvesting = false;
                creep.say('⚡ Energy Full');
            } else {
                let sources = creep.room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 0 });

                if (!sources.length) {
                    sources = creep.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0 });
                }

                if (sources.length) {
                    let target = creep.pos.findClosestByPath(sources);
                    if (target) {
                        creep.memory.source = target.id;

                        if (creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY, creep.storeCapacity - creep.store) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.source));
                        }
                    }
                } else {
                    let source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }


        // Creep had no repair work or construction sites so while creep has energy
        if (!creep.memory.building && !creep.memory.harvesting) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;
