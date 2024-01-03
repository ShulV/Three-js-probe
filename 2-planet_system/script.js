import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 30, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// массив объектов, направление которых обновляется
const objects = [];
 
// использовать только одну сферу для всего
const radius = 1;
const widthSegments = 15;
const heightSegments = 15;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);
 
const solarSystem = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const moonOrbit = new THREE.Object3D();

solarSystem.add(earthOrbit);
earthOrbit.add(moonOrbit);

//СОЛНЦЕ
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // сделать солнце большим
objects.push(sunMesh);
objects.push(solarSystem);

//ЗЕМЛЯ
const earthMaterial = new THREE.MeshPhongMaterial({emissive: 0x0000FF});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.scale.set(2, 2, 2);
earthOrbit.position.x = 15;
earthOrbit.add(earthMesh);
objects.push(earthOrbit);
objects.push(earthMesh);

// //ЛУНА
const moonMaterial = new THREE.MeshPhongMaterial({emissive: 0x666666});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.position.x = 5;
moonOrbit.add(moonMesh);
objects.push(moonOrbit);
objects.push(moonMesh);

solarSystem.add(sunMesh);
solarSystem.add(earthOrbit);
scene.add(solarSystem);

const color = 0xFFFFFF;
const intensity = 500;
const light = new THREE.PointLight(color, intensity);
scene.add(light);



//СТРЕЛКИ - ПОМОЩНИКИ
// добавляем AxesHelper к каждому узлу
objects.forEach((node) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });


function animate() {
    objects.forEach((obj) => {
        obj.rotation.y = Date.now() * 0.001;
      });
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
}

animate();