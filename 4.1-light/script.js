import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import  GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm'; 


const scene = new THREE.Scene();

const fov = 45;
const aspect = 2;  // значение по умолчанию для холста
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

//ПЛОСКОСТЬ
const planeSize = 40;
 
const loader = new THREE.TextureLoader();
const texture = loader.load('../checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);
//СФЕРА

const sphereRadius = 3;
const sphereWidthDivisions = 32;
const sphereHeightDivisions = 16;
const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat );
sphereMesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
scene.add( sphereMesh );

//КУБ

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0.5, 0.5, 0.5);
scene.add(cube);



const color = 0xFFFFFF;
const intensity = 150;
// const light = new THREE.DirectionalLight(color, intensity);
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 10, 0);
// light.target.position.set(-5, 0, 0);
scene.add(light);
// scene.add(light.target);

//КОНТРОЛЫ
class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);

gui.add(light, 'distance', 0, 40).onChange(updateLight);
// gui.add(light.target.position, 'x', -10, 10);
// gui.add(light.target.position, 'z', -10, 10);
// gui.add(light.target.position, 'y', 0, 10);

//ХЭЛПЕР
const helper = new THREE.PointLightHelper(light);
// const helper = new THREE.DirectionalLightHelper(light);
scene.add(helper);

//УПРАВЛЕНИЕ ИСТОЧНИКОМ СВЕТА 

function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
}

function updateLight() {
    // light.target.updateMatrixWorld();
    helper.update();
}
updateLight();

makeXYZGUI(gui, light.position, 'position', updateLight);
// makeXYZGUI(gui, light.target.position, 'target', updateLight);




function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();






//ОБРАБОТКА КНОПОК

let blocker = false;

function handleKeyPress(event) {
    let element = sphereMesh;
    switch (event.key) {
        case 'ArrowUp':
            // Обработка нажатия стрелки вверх
            console.log('Arrow Up pressed');
            if (blocker == false) {
                
                element.position.x += 1;
                blocker = true;
                setTimeout(() => {
                    blocker = false;
                }, 100);
            }
            break;
        case 'ArrowDown':
            // Обработка нажатия стрелки вниз
            console.log('Arrow Down pressed');
            if (blocker == false) {
              
                element.position.x -= 1;
                blocker = true;
                setTimeout(() => {
                    blocker = false;
                }, 100);
            }
            break;
        case 'ArrowLeft':
            // Обработка нажатия стрелки влево
            console.log('Arrow Left pressed');
            if (blocker == false) {
             
                element.position.z -= 1;
                blocker = true;
                setTimeout(() => {
                    blocker = false;
                }, 100);
            }
            break;
        case 'ArrowRight':
            // Обработка нажатия стрелки вправо
            console.log('Arrow Right pressed');
            if (blocker == false) {
                
                element.position.z += 1;
                blocker = true;
                setTimeout(() => {
                    blocker = false;
                }, 100);
            }
            break;
        default:
            // Другие клавиши
            break;
    }
    updateLight();
}
// Привязываем глобальный обработчик к объекту document
document.addEventListener('keydown', handleKeyPress);