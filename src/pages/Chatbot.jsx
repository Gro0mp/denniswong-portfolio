import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const Chatbot = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        mountRef.current.appendChild(renderer.domElement);

        // Store refs for cleanup
        sceneRef.current = scene;
        rendererRef.current = renderer;

        // Camera position
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);

        // Setup OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth camera movements
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 100;
        controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below ground
        controlsRef.current = controls;

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        // Ground plane
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        // Add a temporary cube while we fix the model loading
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff88 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.y = 0.5;
        scene.add(cube);

        // Load GLTF model (with better error handling)
        const loader = new GLTFLoader();
        const modelPath = 'models/lapwing.glb';

        console.log('Attempting to load model from:', window.location.origin + modelPath);

        loader.load(
            modelPath,
            function (gltf) {
                // Remove the temporary cube
                scene.remove(cube);

                const character = gltf.scene;
                character.position.y = 0.5;

                // Safe scaling - ensure all materials and textures are loaded first
                character.traverse((child) => {
                    if (child.isMesh) {
                        // Ensure materials are properly loaded
                        if (child.material) {
                            child.material.needsUpdate = true;
                        }
                        // Clone geometry to avoid reference issues during scaling
                        if (child.geometry) {
                            child.geometry = child.geometry.clone();
                        }
                    }
                });

                // Apply scaling safely
                character.scale.set(1, 1, 1); // Adjust scale values as needed

                // Update matrix after scaling
                character.updateMatrix();
                character.updateMatrixWorld(true);

                scene.add(character);
                console.log('Model loaded and scaled successfully');
            },
            function (progress) {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            function (error) {
                console.error('Error loading model:', error);
                console.error('Make sure lapwing.glb is in public/models/ directory');
                console.error('And that you\'re running the dev server with: npm run dev');
                // Keep the fallback cube (already added above)
            }
        );

        // Animation loop
        function animate() {
            animationIdRef.current = requestAnimationFrame(animate);

            // Update controls for damping
            if (controlsRef.current) {
                controlsRef.current.update();
            }

            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            if (controlsRef.current) {
                controlsRef.current.dispose();
            }

            if (mountRef.current && rendererRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

            if (sceneRef.current) {
                // Dispose of geometries and materials
                sceneRef.current.traverse((object) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100vw',
                height: '100vh',
            }}
        />
    );
};