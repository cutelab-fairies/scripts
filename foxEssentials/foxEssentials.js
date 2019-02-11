// ┏━╸┏━┓╻ ╻
// ┣╸ ┃ ┃┏╋┛
// ╹  ┗━┛╹ ╹
// ┏━╸┏━┓┏━┓┏━╸┏┓╻╺┳╸╻┏━┓╻  ┏━┓
// ┣╸ ┗━┓┗━┓┣╸ ┃┗┫ ┃ ┃┣━┫┃  ┗━┓
// ┗━╸┗━┛┗━┛┗━╸╹ ╹ ╹ ╹╹ ╹┗━╸┗━┛
// https://cutelab.space

//var uuid = Uuid.generate(); 
var uuid = "foxEssentials"; 
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg;xml,<svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M7.782 47.391v-29.89H3.247v-3.043h4.535v-4.322c.04-3.267.796-5.773 2.268-7.518C11.52.873 13.555 0 16.152 0c1.177 0 2.263.173 3.257.518l-.243 3.104a11.253 11.253 0 0 0-2.74-.334c-1.643 0-2.927.613-3.85 1.84-.923 1.229-1.385 2.989-1.385 5.282v4.048h6.453v3.044H11.19v29.89H7.782zM33.095 48c-4.424 0-7.874-1.319-10.35-3.957-2.475-2.638-3.713-6.412-3.713-11.323v-2.617c0-5.195 1.136-9.202 3.41-12.023 2.272-2.82 5.529-4.23 9.77-4.23 4.14 0 7.254 1.321 9.344 3.965 2.09 2.645 3.156 6.56 3.196 11.747v4.224H27.616c.121 2.445.659 4.234 1.613 5.365.953 1.13 2.425 1.696 4.414 1.696 2.88 0 5.285-.984 7.213-2.952l3.379 5.205c-1.055 1.46-2.587 2.643-4.596 3.546-2.01.903-4.19 1.354-6.544 1.354zm-5.419-20.21h8.615v-.792c-.041-1.968-.366-3.46-.974-4.474-.61-1.015-1.665-1.522-3.166-1.522-1.502 0-2.593.538-3.272 1.613-.68 1.076-1.08 2.8-1.203 5.175z"/></svg>',
	//icon: Script.resolvePath("icon.svg")+"?2",
	text: "essentials",
	sortOrder: 11
});

var disableTrackingSmoothing = Controller.parseMapping(JSON.stringify({
	name: "cat.maki.foxEssentials.disableTrackingSmoothing",
	channels: ["LeftHand","RightHand","LeftFoot","RightFoot","Hips","Spine2","Head"].map(function(channel) {
		return {
			from: "Standard."+channel,
			to: "Actions."+channel,
			filters: [{ type: "exponentialSmoothing", translation: 1, rotation: 1 }]
		}
	})
}));

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		key: key, value: value,
		uuid: uuid,
	}));
}

var lastSpawnedEntities = [];

function spawnEntityJSON(json) {
	var position = Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(Quat.cancelOutRollAndPitch(Camera.orientation), {y: 0.3, z: -0.5}));
	var rotation = Quat.cancelOutRollAndPitch(Camera.orientation);
	
	function spawnEntity(entity, parentID) {
		if (!parentID) entity.position = Vec3.sum(entity.position, position);
		if (!parentID) entity.rotation = Quat.multiply(entity.rotation, rotation);
		if (parentID) entity.parentID = parentID;

		var children = []; 
		if (entity.children) {
			children = entity.children;
			delete entity.children;
		}
		
		var entityID = Entities.addEntity(entity, !(Entities.canRez()||Entities.canRezTmp()))
		lastSpawnedEntities.push(entityID);

		children.forEach(function(child) {
			spawnEntity(child, entityID);
		});
	}

	json.forEach(function(entity) {
		spawnEntity(entity);
	});
}

function lockWearables(lock) {
	function actuallyLockWearables(lock) {
		Entities.findEntities(MyAvatar.position, 5).forEach(function(entityID) {
			var entity = Entities.getEntityProperties(entityID, ["parentID"]);
			if (entity.parentID != MyAvatar.sessionUUID) return;
			
			Entities.editEntity(entityID, {
				locked: lock
			});
		});
	}

	if (Entities.canAdjustLocks()) {
		actuallyLockWearables(lock);
	} else {
		Window.location = "file://";
		Script.setTimeout(function() {
			actuallyLockWearables(lock);
			Script.setTimeout(function() {Window.location.goBack()}, 500);
		}, 500);
	}
}

function deleteLastSpawnedEntity() {
	var lastEntity = lastSpawnedEntities.splice(-1,1);
	if (lastEntity.length<1) return;

	Entities.deleteEntity(lastEntity[0]);
}

function changeSetting(key, value) {
	var somethingChanged = true;

	switch (key) {
		case "disableWorldCollisions":
			//var newCollisionsEnabled = (value!=undefined)? value: !MyAvatar.getCollisionsEnabled();
			//Settings.setValue("cat.maki.foxEssentials.collisionsEnabled", newCollisionsEnabled);

			MyAvatar.setCollisionsEnabled(!MyAvatar.getCollisionsEnabled());
			overrideSomethingChanged = true;
		break;
		case "disableAvatarCollisions":
			//var newCollisionsEnabled = (value!=undefined)? value: !MyAvatar.getCollisionsEnabled();
			//Settings.setValue("cat.maki.foxEssentials.collisionsEnabled", newCollisionsEnabled);

			MyAvatar.setOtherAvatarsCollisionsEnabled(!MyAvatar.getOtherAvatarsCollisionsEnabled());
			overrideSomethingChanged = true;
		break;
		case "enableFlying":
			var flyingEnabled = MyAvatar.getFlyingEnabled();
			MyAvatar.setFlyingDesktopPref(!flyingEnabled);
			MyAvatar.setFlyingHMDPref(!flyingEnabled);
		break;
				
		case "sizeSmaller": MyAvatar.scale = MyAvatar.scale*0.8; break;
		case "sizeBigger": MyAvatar.scale = MyAvatar.scale*1.2; break;
		case "sizeNumber": if (!value) break; MyAvatar.scale = value; break;

		case"speedFaster":
			MyAvatar.walkSpeed = MyAvatar.walkSpeed*1.2;
			MyAvatar.walkBackwardSpeed = MyAvatar.walkBackwardSpeed*1.2;
		break;
		case"speedSlower":
			MyAvatar.walkSpeed = MyAvatar.walkSpeed*0.8;
			MyAvatar.walkBackwardSpeed = MyAvatar.walkBackwardSpeed*0.8;
		break;
		case "speedNumber":
			if (!value) break;
			MyAvatar.walkSpeed = value;
			MyAvatar.walkBackwardSpeed = value;
		break;

		case "orientation0deg":
			MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		break;

		case "orientation180deg":
			MyAvatar.orientation = Quat.multiply(
				Quat.cancelOutRollAndPitch(MyAvatar.orientation),
				Quat.fromPitchYawRollDegrees(0, 0, 180)
			);
		break;

		case "wearablesLock": lockWearables(true); break;
		case "wearablesUnlock": lockWearables(false); break;

		case "displayName":
			if (!value) break;
			MyAvatar.displayName = value;
		break;

		case "disableTrackingSmoothing":
			var newDisableTrackingSmoothing = (value!=undefined)? value: !Settings.getValue("cat.maki.foxEssentials.disableTrackingSmoothing");
			Settings.setValue("cat.maki.foxEssentials.disableTrackingSmoothing", newDisableTrackingSmoothing);

			if (newDisableTrackingSmoothing) {
				disableTrackingSmoothing.enable();
			} else {
				disableTrackingSmoothing.disable();
			}
		break;

		case "fixPointerPosition":
			var foundScriptLink = false;
			var runningScripts = ScriptDiscoveryService.getRunning();

			for (var i=0; i<runningScripts.length; i++) {
				if (runningScripts[i].name == "defaultScripts.js") {
					foundScriptLink = runningScripts[i].url;
					break;
				}
			}
			if (!foundScriptLink) break;

			MyAvatar.scale = 1;
			//ScriptDiscoveryService.stopScript(foundScriptLink);
			Script.setTimeout(function() {
				//ScriptDiscoveryService.loadScript(foundScriptLink, false, false, false, true);
				ScriptDiscoveryService.reloadAllScripts();
			}, 1000);
		break;

		case "disableAntiAliasing":
			var newDisableAntiAliasing = (value!=undefined)? value: !Settings.getValue("cat.maki.foxEssentials.disableAntiAliasing");
			Settings.setValue("cat.maki.foxEssentials.disableAntiAliasing", newDisableAntiAliasing);

			if (newDisableAntiAliasing) {
				Render.getConfig("RenderMainView.Antialiasing")["constrainColor"] = false;
				Render.getConfig("RenderMainView.Antialiasing")["feedbackColor"] = false;
				Render.getConfig("RenderMainView.Antialiasing")["blend"] = 1;
				Render.getConfig("RenderMainView.Antialiasing")["sharpen"] = 0;
				Render.getConfig("RenderMainView.JitterCam").none();
				
				Render.getConfig("SecondaryCameraJob.Antialiasing")["constrainColor"] = false;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["feedbackColor"] = false;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["blend"] = 1;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["sharpen"] = 0;
				Render.getConfig("SecondaryCameraJob.JitterCam").none();
			} else {
				Render.getConfig("RenderMainView.Antialiasing")["constrainColor"] = true;
				Render.getConfig("RenderMainView.Antialiasing")["feedbackColor"] = true;
				Render.getConfig("RenderMainView.Antialiasing")["blend"] = 0.25;
				Render.getConfig("RenderMainView.Antialiasing")["sharpen"] = 0.05;
				Render.getConfig("RenderMainView.JitterCam").play();

				Render.getConfig("SecondaryCameraJob.Antialiasing")["constrainColor"] = true;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["feedbackColor"] = true;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["blend"] = 0.25;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["sharpen"] = 0.05;
				Render.getConfig("SecondaryCameraJob.JitterCam").play();
			}
		break;

		case "enableFilmicToneMapping":
			var newEnableFilmicToneMapping = (value!=undefined)? value: !Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
			Settings.setValue("cat.maki.foxEssentials.enableFilmicToneMapping", newEnableFilmicToneMapping);

			// uses indicies from /scripts/developer/utilities/render/deferredLighting.qml
			Render.getConfig("RenderMainView.ToneMapping")["curve"] = (newEnableFilmicToneMapping)? 3: 1;
		break;

		default: somethingChanged = false; break;
	}

	if (somethingChanged)
		Script.setTimeout(function() {
			updateSettings();
		}, 100);
}

var scriptsInProgress = [];

function toggleScript(script) {
	if (scriptsInProgress[script.filename]) return; 

	var foundScriptLink = false;
	var runningScripts = ScriptDiscoveryService.getRunning();

	for (var i=0; i<runningScripts.length; i++) {
		if (runningScripts[i].name == script.filename) {
			foundScriptLink = runningScripts[i].url;
			break;
		}
	}

	if (foundScriptLink) {
		ScriptDiscoveryService.stopScript(foundScriptLink);
	} else {
		if (script.link) {
			ScriptDiscoveryService.loadScript(script.link);
		} else {
			tablet.loadQMLSource("hifi/commerce/checkout/Checkout.qml");
			tablet.sendToQml({method: "updateCheckoutQMLItemID", params: {itemId: script.itemId}});
		}
	}

	scriptsInProgress[script.filename] = true;
	Script.setTimeout(function() {
		delete scriptsInProgress[script.filename];
	}, 200); // so they dont load it twice

	updateScripts();
}

function updateSettings(override) {
	if (!override) override = {}
	emitEvent("updateSettings", {
		disableWorldCollisions: (override.disableWorldCollisions)? override.disableWorldCollisions: !MyAvatar.getCollisionsEnabled(),
		disableAvatarCollisions: (override.disableAvatarCollisions)? override.disableAvatarCollisions: !MyAvatar.getOtherAvatarsCollisionsEnabled(),
		enableFlying: MyAvatar.getFlyingEnabled(),

		sizeNumber: MyAvatar.scale.toFixed(3),
		speedNumber: MyAvatar.walkSpeed.toFixed(3),

		displayName: MyAvatar.displayName,

		disableTrackingSmoothing: (Settings.getValue("cat.maki.foxEssentials.disableTrackingSmoothing"))? true: false,
		
		disableAntiAliasing: (Settings.getValue("cat.maki.foxEssentials.disableAntiAliasing"))? true: false,
		enableFilmicToneMapping: (Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping"))? true: false,
	})
}

function updateScripts() {
	emitEvent("updateScripts", ScriptDiscoveryService.getRunning().map(function(script) {
		return script.name;
	}))
}

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;

	switch (json.key) {
		case "changeAvatar":
			if (json.value.name==undefined) break;
			if (json.value.url==undefined) break;

			if (Window.confirm("Would you like to load the avatar: "+json.value.name)) {
				MyAvatar.getAttachmentsVariant().forEach(function(attachment) {
					MyAvatar.detachOne(attachment.modelUrl, attachment.jointName);
				});

				MyAvatar.useFullAvatarURL(json.value.url, json.value.name);
			}
		break;

		case "updateSettings": updateSettings(); break;
		case "changeSetting":
			if (json.value.key==undefined) break;
			changeSetting(json.value.key, json.value.value);
		break;
		
		case "updateScripts": updateScripts(); break;
		case "toggleScript":
			if (json.value==undefined) break;
			toggleScript(json.value);
		break;

		case "deleteLastSpawnedEntity": deleteLastSpawnedEntity(); break;
		case "spawnEntityJSON":
			if (json.value==undefined) break;
			spawnEntityJSON(json.value);
		break;
	}
}

function buttonClicked() {
	//tablet.gotoWebScreen(Script.resolvePath("app/index.html")+"?uuid="+uuid);
	tablet.gotoWebScreen(Script.resolvePath("app/index.html"));
}

// init
function getValueAndChangeSetting(key) {
	var value = Settings.getValue("cat.maki.foxEssentials."+key);
	if (value == undefined) return;
	changeSetting(key, value);
}

getValueAndChangeSetting("disableAntiAliasing");
getValueAndChangeSetting("disableTrackingSmoothing");
getValueAndChangeSetting("enableFilmicToneMapping");

function collisionsEnabledChanged(enabled) { updateSettings({disableWorldCollisions: !enabled}); }
function otherAvatarsCollisionsEnabledChanged(enabled) { updateSettings({disableAvatarsCollisions: !enabled}); }
function scaleChanged() { updateSettings(); }
function scriptCountChanged() { updateScripts(); }

MyAvatar.collisionsEnabledChanged.connect(collisionsEnabledChanged);
MyAvatar.otherAvatarsCollisionsEnabledChanged.connect(otherAvatarsCollisionsEnabledChanged);
MyAvatar.scaleChanged.connect(scaleChanged);
ScriptDiscoveryService.scriptCountChanged.connect(scriptCountChanged);

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);

Script.scriptEnding.connect(function() {
	MyAvatar.collisionsEnabledChanged.disconnect(collisionsEnabledChanged);
	MyAvatar.otherAvatarsCollisionsEnabledChanged.disconnect(otherAvatarsCollisionsEnabledChanged);
	MyAvatar.scaleChanged.disconnect(scaleChanged);
	ScriptDiscoveryService.scriptCountChanged.disconnect(scriptCountChanged);
	
	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);

	tablet.removeButton(button);
});
