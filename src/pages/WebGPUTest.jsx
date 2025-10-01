import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const WebGPUTest = () => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const cubeRef = useRef(null);
    const invisiblePlaneRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Clear any existing content
        mountRef.current.innerHTML = '';

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Setup camera
        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1;
        const far = 10000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 100);
        cameraRef.current = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Setup lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 100, 10);
        scene.add(directionalLight);

        // Create cube
        const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
        const cubeMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            wireframe: true
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);
        cubeRef.current = cube;

        // Create invisible plane for raycasting
        const planeGeometry = new THREE.PlaneGeometry(10000, 10000);
        const planeMaterial = new THREE.MeshBasicMaterial({
            visible: false
        });
        const invisiblePlane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(invisiblePlane);
        invisiblePlaneRef.current = invisiblePlane;

        // Mouse click handler
        const handleClick = (event) => {
            console.log('Click detected!');

            const rect = renderer.domElement.getBoundingClientRect();
            const pixelCoords = new THREE.Vector2(
                event.clientX - rect.left,
                event.clientY - rect.top
            );

            console.log('Pixel coords', pixelCoords);

            // Convert to normalized device coordinates
            const mouse = new THREE.Vector2(
                (pixelCoords.x / renderer.domElement.clientWidth) * 2 - 1,
                -(pixelCoords.y / renderer.domElement.clientHeight) * 2 + 1
            );

            console.log('Normalized coords', mouse);

            // Create raycaster
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // Check intersection with invisible plane
            const intersects = raycaster.intersectObject(invisiblePlane);

            if (intersects.length > 0) {
                const point = intersects[0].point;
                console.log('Intersection point', point);
                cube.position.copy(point);
            }
        };

        renderer.domElement.addEventListener('click', handleClick);

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            renderer.domElement.removeEventListener('click', handleClick);
            window.removeEventListener('resize', handleResize);

            // Clean up Three.js objects
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }

            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0
            }}
        />
    );
};