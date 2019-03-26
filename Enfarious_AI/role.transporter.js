var roleTransporter = {
    run: function (creep) {
        if (creep.carry.energy == 0 || creep.memory.collecting) {
            var stores = creep.room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_STORAGE && structure.store.energy > 0 });

            if (!stores.length) {
                stores = creep.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0 });
            }

            if (stores.length) {
                var target = creep.pos.findClosestByPath(stores);
                if (target) {
                    creep.memory.collecting = true;
                    creep.memory.target = target.id;
                }
            } else {
                creep.memory.collecting = false;
                creep.memory.target = '';
            }
        }

        if (creep.memory.collecting && creep.carry.energy >= creep.carryCapacity * .9) {
            creep.say("Depositing");
            creep.memory.collecting = false;
            creep.memory.target = '';
        } else if (!creep.memory.collecting && creep.carry.energy == 0) {
            creep.say("Collecting");
            creep.memory.collecting = true;
            creep.memory.target = '';
        }

        if (!creep.memory.collecting && creep.memory.target == '') {
            var targets = creep.room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity });

            if (!targets.length) {
                targets = creep.room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_EXTENSION || STRUCTURE_SPAWN && structure.store < structure.energyCapacity * .9 });
            }
            if (!targets.length) {
                targets = creep.room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_STORAGE || STRUCTURE_CONTAINER && structure.store < structure.energyCapacity * .9 });
            }

            if (targets.length) {
                targets.sort((a, b) => a.energy - b.energy);
                creep.memory.target = targets[0].id;
                creep.memory.collecting = false;
            }
        }

        if (creep.memory.collecting) {
            if (creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY, creep.storeCapacity - creep.store) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }

            if (creep.carryCapacity == creep.carry.energy) {
                creep.memory.collecting = false;
                creep.memory.target = '';
            }
        } else if (creep.memory.target != '') {
            var target = Game.getObjectById(creep.memory.target);

            if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }

            if (creep.carry.energy == 0) {
                creep.memory.collecting = true;
                creep.memory.target = '';
            }

            if (target.structureType == STRUCTURE_SPAWN | STRUCTURE_EXTENSION && target.energy == target.energyCapacity) {
                creep.memory.target = '';
            } else if (target.store == target.storeCapacity) {
                creep.memory.target = '';
            }
        }
    }
};

module.exports = roleTransporter;