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
	//icon: 'data:image/svg;xml,<svg viewBox="0 0 81 76" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M14.551 152.05V56.152H0v-9.766h14.551V32.519c.13-10.482 2.555-18.522 7.275-24.121C26.546 2.799 33.073 0 41.406 0c3.776 0 7.259.553 10.449 1.66l-.781 9.961a36.102 36.102 0 0 0-8.789-1.074c-5.273 0-9.391 1.969-12.353 5.908-2.963 3.939-4.444 9.586-4.444 16.943v12.988h20.703v9.766H25.488v95.898H14.551zM95.762 154.004c-14.193 0-25.261-4.232-33.203-12.696-7.943-8.463-11.914-20.573-11.914-36.328v-8.398c0-16.667 3.645-29.525 10.937-38.575 7.292-9.049 17.741-13.574 31.348-13.574 13.281 0 23.274 4.242 29.98 12.725 6.706 8.484 10.124 21.046 10.254 37.687v13.553h-54.98c.39 7.846 2.115 13.584 5.175 17.213 3.06 3.629 7.78 5.443 14.161 5.443 9.244 0 16.959-3.157 23.144-9.472l10.84 16.699c-3.386 4.687-8.301 8.48-14.746 11.377-6.446 2.897-13.444 4.346-20.996 4.346zM78.379 89.16h27.637v-2.539c-.131-6.315-1.172-11.101-3.125-14.356-1.954-3.255-5.339-4.883-10.157-4.883-4.817 0-8.317 1.726-10.498 5.176-2.181 3.451-3.466 8.985-3.857 16.602z"/></svg>',
	//icon: 'data:image/svg;xml,<svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" ><path d="M3.891 23.695V8.751H1.623V7.229h2.268V5.068c.02-1.634.398-2.887 1.134-3.76C5.76.437 6.778 0 8.076 0c.589 0 1.131.086 1.629.259L9.583 1.81a5.626 5.626 0 0 0-1.37-.167c-.822 0-1.463.307-1.925.92-.462.614-.692 1.494-.692 2.64V7.23h3.226V8.75H5.596v14.944H3.89zM16.547 24c-2.212 0-3.937-.66-5.174-1.979-1.238-1.318-1.857-3.206-1.857-5.66v-1.31c0-2.597.568-4.6 1.704-6.011 1.137-1.41 2.765-2.116 4.886-2.116 2.07 0 3.627.662 4.672 1.984s1.577 3.28 1.598 5.873v2.112h-8.568c.06 1.222.33 2.117.806 2.682.477.566 1.213.848 2.207.848 1.44 0 2.643-.492 3.607-1.476l1.689 2.603c-.528.73-1.294 1.321-2.298 1.773-1.005.451-2.095.677-3.272.677zm-2.709-10.105h4.307v-.396c-.02-.984-.183-1.73-.487-2.237-.305-.507-.832-.761-1.583-.761-.75 0-1.296.269-1.636.806-.34.538-.54 1.4-.601 2.588z"/></svg>',
	//icon: 'data:image/svg;xml,<svg viewBox="0 0 32 33" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M5.188 31.595V11.668H2.165v-2.03h3.023v-2.88c.027-2.179.531-3.85 1.512-5.013C7.68.582 9.037 0 10.77 0c.784 0 1.508.115 2.17.345l-.161 2.07a7.502 7.502 0 0 0-1.827-.223C9.856 2.192 9 2.6 8.384 3.419c-.615.819-.923 1.992-.923 3.52v2.7h4.302v2.029H7.46v19.927H5.188zM22.063 32c-2.949 0-5.249-.879-6.899-2.637-1.65-1.759-2.476-4.275-2.476-7.549v-1.745c0-3.463.758-6.135 2.273-8.016 1.515-1.88 3.686-2.82 6.514-2.82 2.76 0 4.836.881 6.23 2.644 1.393 1.763 2.103 4.373 2.13 7.831v2.816H18.411c.08 1.63.44 2.823 1.075 3.577.636.754 1.617 1.131 2.943 1.131 1.92 0 3.524-.656 4.809-1.968l2.252 3.47c-.703.974-1.725 1.762-3.064 2.364-1.34.602-2.793.903-4.363.903zm-3.612-13.473h5.743v-.528c-.027-1.312-.243-2.307-.65-2.983-.405-.676-1.109-1.015-2.11-1.015-1 0-1.728.36-2.181 1.076-.453.717-.72 1.867-.802 3.45z"/></svg>',
	icon: 'data:image/svg;xml,<svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M7.782 47.391v-29.89H3.247v-3.043h4.535v-4.322c.04-3.267.796-5.773 2.268-7.518C11.52.873 13.555 0 16.152 0c1.177 0 2.263.173 3.257.518l-.243 3.104a11.253 11.253 0 0 0-2.74-.334c-1.643 0-2.927.613-3.85 1.84-.923 1.229-1.385 2.989-1.385 5.282v4.048h6.453v3.044H11.19v29.89H7.782zM33.095 48c-4.424 0-7.874-1.319-10.35-3.957-2.475-2.638-3.713-6.412-3.713-11.323v-2.617c0-5.195 1.136-9.202 3.41-12.023 2.272-2.82 5.529-4.23 9.77-4.23 4.14 0 7.254 1.321 9.344 3.965 2.09 2.645 3.156 6.56 3.196 11.747v4.224H27.616c.121 2.445.659 4.234 1.613 5.365.953 1.13 2.425 1.696 4.414 1.696 2.88 0 5.285-.984 7.213-2.952l3.379 5.205c-1.055 1.46-2.587 2.643-4.596 3.546-2.01.903-4.19 1.354-6.544 1.354zm-5.419-20.21h8.615v-.792c-.041-1.968-.366-3.46-.974-4.474-.61-1.015-1.665-1.522-3.166-1.522-1.502 0-2.593.538-3.272 1.613-.68 1.076-1.08 2.8-1.203 5.175z"/></svg>',
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
		entity.position = (entity.position)? Vec3.sum(entity.position, position): position;
		entity.rotation = (entity.rotation)? Quat.multiply(entity.rotation, rotation): rotation;
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
		case "disableCollisions":
			var newCollisionsEnabled = (value!=undefined)? value: !MyAvatar.getCollisionsEnabled();
			Settings.setValue("cat.maki.foxEssentials.collisionsEnabled", newCollisionsEnabled);

			MyAvatar.setCollisionsEnabled(newCollisionsEnabled);
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
		disableCollisions: (override.disableCollisions)? override.disableCollisions: !MyAvatar.getCollisionsEnabled(),
		enableFlying: MyAvatar.getFlyingEnabled(),

		sizeNumber: MyAvatar.scale.toFixed(3),
		speedNumber: MyAvatar.walkSpeed.toFixed(3),

		displayName: MyAvatar.displayName,

		disableTrackingSmoothing: (Settings.getValue("cat.maki.foxEssentials.disableTrackingSmoothing"))? true: false,
		
		disableAntiAliasing: (Settings.getValue("cat.maki.foxEssentials.disableAntiAliasing"))? true: false,
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
Script.setInterval(function() {
	getValueAndChangeSetting("collisionsEnabled");
}, 1000);

function collisionsEnabledChanged(enabled) { updateSettings({disableCollisions: !enabled}); }
function scaleChanged() { updateSettings(); }
function scriptCountChanged() { updateScripts(); }

MyAvatar.collisionsEnabledChanged.connect(collisionsEnabledChanged);
MyAvatar.scaleChanged.connect(scaleChanged);
ScriptDiscoveryService.scriptCountChanged.connect(scriptCountChanged);

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);

Script.scriptEnding.connect(function() {
	MyAvatar.collisionsEnabledChanged.disconnect(collisionsEnabledChanged);
	MyAvatar.scaleChanged.disconnect(scaleChanged);
	ScriptDiscoveryService.scriptCountChanged.disconnect(scriptCountChanged);
	
	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);

	tablet.removeButton(button);
});
