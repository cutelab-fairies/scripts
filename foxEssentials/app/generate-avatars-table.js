var fs = require("fs"); 
var baseURL = "https://scripts.cutelab.space/foxEssentials/app/";

var avatarsJS = fs.readFileSync("./content.js", "utf8").match(/avatars: \[([\s\S]*)worlds: \[/)[1];
avatarsJS = "var avatars = ["+avatarsJS.trim().slice(0,-1);
eval(avatarsJS)

function makeAvatar(avatar) { // {name, thumbnail, url}
	return (
		'<td><a href="'+avatar.url+'">'+
		'<img width="150px" src="'+baseURL+avatar.thumbnail+'"/>'+
		//'<div style="width: 150px; height: 100px; background-image: url('+baseURL+avatar.thumbnail+')"/></div>'+
		'<br>'+
		avatar.name+'</a></td>'
	);
}

function fixCategoryName(name) {
	if (name.startsWith("<svg")) return "<img src='https://cutelab.space/logo.png' height='60px'/>";

	let height = parseInt(name.match(/style='height: ([0-9]{0,9999}px)'/)[1]);

	return name
		.replace(/src='([\s\S]*)'/, "src='"+baseURL+"$1'")
		.replace(/style='height: ([0-9]{0,9999}px)'/, "height='"+height+"px'")
}

var out = "";

avatars.forEach(category=>{
	if (category.avatars==undefined) return;

	out += fixCategoryName(category.name)+"\n";
	out += "<table>";

	category.avatars.forEach((avatar,i)=>{
		if (i%4==0) {
			if (i==0) {
				out += "<tr>";
			} else {
				out += "</tr><tr>";
			}
		}

		out += makeAvatar(avatar);
	});

	out += "</tr></table><br>\n\n";
});

fs.writeFileSync("./avatars-table.html", out);