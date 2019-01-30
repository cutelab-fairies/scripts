var foundScriptLink = false;
var runningScripts = ScriptDiscoveryService.getRunning();

for (var i=0; i<runningScripts.length; i++) {
	if (runningScripts[i].name == "hifiEssentials.js") {
		foundScriptLink = runningScripts[i].url;
		break;
	}
}

if (foundScriptLink) {
	[
	    "cat.maki.hifiEssentials.collisionsEnabled",
    	"cat.maki.hifiEssentials.disableAntiAliasing",
    	"cat.maki.hifiEssentials.disableTrackingSmoothing",
	].forEach(function(setting) {
		var value = Settings.getValue(setting);
		Settings.setValue(setting.replace("hifiEssentials", "foxEssentials"), value);
		Settings.setValue(setting, undefined);
	})

	ScriptDiscoveryService.stopScript(foundScriptLink);
	ScriptDiscoveryService.loadScript("https://scripts.cutelab.space/foxEssentials/foxEssentials.js");
}