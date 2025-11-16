// Initialize scene, camera, and renderer
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export async function Model(scene) {
    const loader = new GLTFLoader();
    loader.load("C:/Users/denni/Coding Projects/Gro0mp.github.io/public/models/lapwing/scene.gltf", (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        scene.add(model);
    });
}
