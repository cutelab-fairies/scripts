(function() {
	var interval = undefined;

	function updateEntity(entityID, parentID, force) {
		var entity = Entities.getEntityProperties(entityID, ["dimensions"]);
		var parent = Entities.getEntityProperties(parentID, ["dimensions"]);

		if (Math.abs(parent.dimensions.x-entity.dimensions.x)>0.011 || force) {
			//console.log("updating entity");
			Entities.editEntity(entityID, {
				localPosition: {
					x: 0,
					y: parent.dimensions.y/4, // middle + 25% up
					z: 0
				},
				dimensions: {
					x: parent.dimensions.x-0.01,
					y: 0.001,
					z: parent.dimensions.z-0.01,
				}
			});
		}
	}

	this.preload = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["parentID"]);
		if (!entity.parentID) return;
		var parentID = entity.parentID;

		updateEntity(entityID, parentID, true);
		interval = Script.setInterval(function() {
			updateEntity(entityID, parentID, false);
		}, 500);
	}

	this.unload = function() {
		if (interval) Script.clearInterval(interval);
	}
});