import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {WebGLRenderer} from "three";

export const WebGPUTest = () => {

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x222230);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Create a new scene
    const scene = new THREE.Scene();


    // Setup lighting
    const light = new THREE.DirectionalLight();
    light.interactive = 2;
    light.position.set(2, 5, 10);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    // Setup camera and controls
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-5, 5, 12);
    controls.target.set(-1, 2, 0);
    controls.update();

    // Render loop

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    const floorGeometry = new THREE.PlaneGeometry(25, 20);
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
    const material = new THREE.MeshLambertMaterial();

    const floorMesh = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({color: 0xffffff}));
    floorMesh.rotation.x = -Math.PI/2;
    floorMesh.name = "Floor";
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    function createMesh(geometry, material, x, y, z, name) {

    }

    return (
      <div>
          <></>
      </div>
    );
}