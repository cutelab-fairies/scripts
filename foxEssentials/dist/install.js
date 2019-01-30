(function() {
	var uuid = Uuid.generate();
	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
	var scriptURL = Script.resolvePath("../foxEssentials.js");
	var installURL = Script.resolvePath("install.html?uuid="+uuid);

	function isInstalled() {
		var filename = scriptURL.split("/").pop();
		var runningScripts = ScriptDiscoveryService.getRunning();

		for (var i=0; i<runningScripts.length; i++) {
			if (runningScripts[i].name == filename) return true;
		}

		return false;
	}

	function webEventReceived(string) {
		switch (string.replace("foxEssentialsInstall-"+uuid+"-","")) {
			case "install":
				if (!isInstalled()) ScriptDiscoveryService.loadScript(scriptURL);
			break;
			case "close":
				tablet.gotoHomeScreen();
			break;
		}
	}

	this.preload = function() {
		tablet.webEventReceived.connect(webEventReceived);
	}

	this.unload = function () {
		tablet.webEventReceived.disconnect(webEventReceived);
	}

	this.openInstall = function() {
		tablet.gotoWebScreen(installURL);
	}

	this.startNearTrigger = function() { this.openInstall() };
	this.startFarTrigger = function() { this.openInstall() };
	this.clickDownOnEntity = function(entityID, mouseEvent) {
		if (mouseEvent.isLeftButton) this.openInstall();
	}
})