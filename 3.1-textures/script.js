import * as THREE from 'https://unpkg.com/three/build/three.module.js';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);


        const loader = new THREE.TextureLoader();
        const texture = loader.load( '../texture1.jpg' );
        texture.colorSpace = THREE.SRGBColorSpace;
        const cubeMaterial = new THREE.MeshBasicMaterial({map: texture});
        
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);



        // const color = 0xFFFFFF;
        // const intensity = 3;
        // const light = new THREE.DirectionalLight(color, intensity);
        // light.position.set(-1, 2, 4);
        // scene.add(light);


        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        animate();