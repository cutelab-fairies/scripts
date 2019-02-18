(function() {
	var volume = 0.1;
	var entityID = undefined;
	this.preload = function(_entityID) { entityID = _entityID; }

	var sounds = []; // sounds/hairbrush0[1-6][abc].wav

	for (var i=1; i<=6; i++) { // 6 sounds
		var sound = [];
		for (var j=0; j<3; j++) { // a,b,c
			sound.push(SoundCache.getSound(
				Script.resolvePath("sounds/hairbrush0"+i+String.fromCharCode(97+j)+".wav")
			));
		}
		sounds.push(sound);
	}
	
	var brushing = false;
	var selectedSound = undefined;
	var midAudioInjectors = [];

	function killAllMidAudioInjectors() {
		if (midAudioInjectors.length>0) {
			midAudioInjectors.forEach(function(midAudioInjector) {
				if (midAudioInjector.isPlaying) midAudioInjector.stop();
			});
		}
		midAudioInjectors = [];
	}

	function startMovingAudio(movingAudioInjector) {
		var movingInterval = Script.setInterval(function() {
			if (!movingAudioInjector || !movingAudioInjector.isPlaying) {
				Script.clearInterval(movingInterval);
				return;
			}

			movingAudioInjector.setOptions({
				position: Entities.getEntityProperties(entityID, ["position"]).position,
			});
		}, 1000/30);
	}

	function startBrushing() {
		killAllMidAudioInjectors();

		selectedSound = sounds[Math.floor(Math.random()*sounds.length)];

		var start = Audio.playSound(selectedSound[0], {
			position: Entities.getEntityProperties(entityID, ["position"]).position,
			volume: volume,
			localOnly: false,
		});
		startMovingAudio(start);

		start.finished.connect(function() {
			if (!brushing) return;

			var mid = Audio.playSound(selectedSound[1], {
				position: Entities.getEntityProperties(entityID, ["position"]).position,
				volume: volume,
				localOnly: false,
				loop: true,
			});
			startMovingAudio(mid);
			midAudioInjectors.push(mid);
		});
	}

	function stopBrushing() {
		killAllMidAudioInjectors();

		var end = Audio.playSound(selectedSound[2], {
			position: Entities.getEntityProperties(entityID, ["position"]).position,
			volume: volume,
			localOnly: false,
		});
		startMovingAudio(end);
	}

	this.inputEvent = function(action, value) {
		if (action != Controller.Standard.RTClick &&
			action != Controller.Standard.LTClick) return;

		brushing = !brushing;
		if (brushing) {
			startBrushing();
		} else {
			stopBrushing();
		}
	}

	this.startNearGrab = function() {
		Controller.inputEvent.connect(this.inputEvent);
	}

	this.releaseGrab = function() {
		Controller.inputEvent.disconnect(this.inputEvent);

		brushing = false;
		killAllMidAudioInjectors();
	}
})