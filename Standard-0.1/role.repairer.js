var roleRepairer = {
    run: function(creep) {
        var stores = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType = STRUCTURE_CONTAINER | STRUCTURE_STORAGE}, {structure.store > 50}});
        var target = null;
        
        if (!stores) {
            target = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
        } else {
            target = creep.pos.findClosestByPath(stores);
        }
    }
};

module.exports = roleRepairer;
