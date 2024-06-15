var NEXT_MELODY_NOTES = 8;
var MIN_MELODY_RADIUS = 1.5;
var MAX_MELODY_RADIUS = 2.0;
var MIN_MELODY_DIST = 1.5;
var MAX_MELODY_DIST = 2.0;
var MIN_MELODY_SIZE = 1.0;
var MAX_MELODY_SIZE = 1.5;

var numNotes = -1;
var nextNumNotes = -1;
@@ -111,11 +113,12 @@ bassGeo.faces.push( new THREE.Face3( 0, 2, 3 ) );
var background = new THREE.Mesh(bassGeo, material);
scene.add(background);

var melodyBaseColor = new THREE.Color('#00cc99');
var melodyBaseColor = new THREE.Color('#a9f2dd');
var melodyGeo = new THREE.OctahedronGeometry(0.15, 0);

var melodyMat = new THREE.MeshBasicMaterial(0x000000);
melodyMat.vertexColors = THREE.FaceColors;
var melodyBaseColors = [];

for(var i = 0 ; i < melodyGeo.faces.length; i++)
{
@@ -128,6 +131,8 @@ for(var i = 0 ; i < melodyGeo.faces.length; i++)
  melodyGeo.faces[i].color.r = c.r;
  melodyGeo.faces[i].color.g = c.g;
  melodyGeo.faces[i].color.b = c.b;

  melodyBaseColors.push(c);
}

var melodyObj = new THREE.Mesh(melodyGeo, melodyMat);
@@ -405,13 +410,13 @@ function animateMelodyViz(time)
  melodyTween = THREE.Math.clamp(melodyTween, 0, 1);

  // console.log(melodyTween);
  var radius = lerp(MIN_MELODY_RADIUS, MAX_MELODY_RADIUS, 
  var dist = lerp(MIN_MELODY_DIST, MAX_MELODY_DIST, 
    (melodyTween));
  var melodyT = melodySpeed * time - Math.floor(melodySpeed * time);
  var melodyPoint = new THREE.Vector3(
    radius * -Math.sin(time * melodySpeed),
    radius * -Math.cos(time * melodySpeed),
    radius * 0.0
    dist * -Math.sin(time * melodySpeed),
    dist * -Math.cos(time * melodySpeed),
    dist * 0.0
  );
  melodyObj.position.x = melodyPoint.x;
  melodyObj.position.y = melodyPoint.y;
@@ -420,6 +425,19 @@ function animateMelodyViz(time)
  melodyObj.rotation.y = rot;
  melodyObj.rotation.z = rot;

  var scaleFactor = lerp(MIN_MELODY_SIZE, MAX_MELODY_SIZE, melodyTween);
  melodyObj.scale.x = scaleFactor;
  melodyObj.scale.y = scaleFactor;
  melodyObj.scale.z = scaleFactor;

  for(var i = 0; i < melodyObj.geometry.faces.length; i++)
  {
    var c = new THREE.Color(melodyBaseColors[i]);
    c.lerp(new THREE.Color('#ffffff'), melodyTween);
    melodyObj.geometry.faces[i].color = c;
  }

  melodyObj.geometry.elementsNeedUpdate = true;
}

camera.position.z = 5;
t = 0;
function animate() {
  var dt = 0.0166;
  t += dt;
  animateBassViz(t);
  animateMelodyViz(t);
	requestAnimationFrame( animate );
  TWEEN.update(t * 1000);
	renderer.render( scene, camera );
  // bassObj.rotation.x += 0.01;
  bassObj.rotation.y += 0.01;
  bassObj.geometry.attributes.position.needsUpdate = true;
  bassObj.geometry.attributes.color.needsUpdate = true;
  // melodyObj.rotation.x += 0.01;
  bassTween = TWEEN.Easing.Cubic.Out((getTimestamp() - noteTime) / 1500);
  bkndTween = TWEEN.Easing.Cubic.Out((getTimestamp() - noteTime) / 500);
  if (past_chords.length > 0) {
    var prevChordColor = //new THREE.Color(parseInt(colormap[past_chords[past_chords.length-1][1].name][0].slice(1, 10), 16));
    bkndColor = new THREE.Color(noteColor);
    var black = new THREE.Color('#000000');
    // bkndColor = prevChordColor.lerp(black, 0.7);
    bkndColor = bkndColor.lerp(black, 0.7);
    var prevBkndColor = new THREE.Color(prevNoteColor);
    prevBkndColor = prevBkndColor.lerp(black, 0.7);
    background.material.uniforms.color1.value = prevBkndColor.lerp(bkndColor, bassTween);
  //   TWEEN.Tween.
  // hiFreqNormal = THREE.Math.clamp(
  //   THREE.Math.lerp(hiFreqNormal, 0, 
  //   TWEEN.Easing.Cubic.Out((time - noteTime) / 1500)),
  //   0, 1);
  }
}
animate();