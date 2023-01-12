import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';

let scene, camera, renderer, controls;
let hlight, directionalLight, light, light2, light3, light4;

var container = document.querySelector( '#scene-container' );

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 1;
  camera.position.y = 0;
  camera.position.z = 5;

  controls = new OrbitControls(camera, container);
  controls.addEventListener('change', renderer);

  hlight = new THREE.AmbientLight (0x404040,10);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff,1);
  directionalLight.position.set(0,1,1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.AmbientLight(0xffffff,10)
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4,1);
  light2.position.set(3,3,-3);
  scene.add(light2);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let loader = new GLTFLoader();
  loader.load('troll.glb', function(gltf){
    let obj = gltf.scene.children[0];
    obj.scale.set(0.5,0.5,0.5);
    scene.add(gltf.scene);
    animate();
  });
}
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
init();