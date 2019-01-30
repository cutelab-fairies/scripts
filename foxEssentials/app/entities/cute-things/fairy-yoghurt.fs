// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "https://raw.githubusercontent.com/makitsune/hifi-stuff/master/shaders/candySpiral.fs",
// 		"version": 2,
// 		"grabbableKey": {
// 		  "grabbable": false
// 		}
// 	}
// }

#define speedSnoise iGlobalTime*0.2
#define speedUvZoom iGlobalTime
#define speedUvRotate iGlobalTime

// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void rotate(inout vec2 p, float r) {
	p = vec2(
		p[0]*cos(r) - p[1]*sin(r),
		p[1]*cos(r) + p[0]*sin(r)
	);
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
   	vec2 uv = _position.xz;

   	uv *= 4;
   	uv *= sin(speedUvZoom)/8 + 1;
   	rotate(uv, cos(speedUvRotate)/4);

   	float s = snoise(vec3(uv.x, speedSnoise, uv.y));
	vec3 color = hsv2rgb(vec3(
		s*2, .6, 1
	));
	
	diffuse = color;
	specular = vec3(0);
	shininess = 0;
	return 1;
}