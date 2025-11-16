import * as React from 'react';
import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GUI} from 'lil-gui';

export const Tutorial = () => {
    const mountRef = useRef(null);


    useEffect(() => {
        if (!mountRef.current) return;


        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a); // Dark gray background so axes are visible

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const orbit = new OrbitControls(camera, renderer.domElement);

        camera.position.set(3, 3, 5);
        camera.lookAt(0, 0, 0);
        orbit.update();

        // Add axes helper
        const axesHelper = new THREE.AxesHelper(3);
        scene.add(axesHelper);

        // Add a cube to see something
        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshStandardMaterial({
            color: 0xffea00
        });

        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.castShadow = true;
        scene.add(box);

        // Add a sphere to the scene
        const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            wireframe: false
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        scene.add(sphere);
        sphere.position.set(10, 10, 0)

        // Add a plane geometry
        const planeGeometry = new THREE.PlaneGeometry(30,30);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 'white',
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);
        plane.position.y = -3;
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;

        // Add grid helper
        const gridHelper = new THREE.GridHelper(30);
        scene.add(gridHelper);
        gridHelper.position.y = -3;

        // // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional lighting
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 12;
        scene.add(directionalLight);

        // Add helper for directional light shadows
        const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        scene.add(dLightShadowHelper);

        const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
        scene.add(dLightHelper);

        const spotLight = new THREE.SpotLight(0xFFFFFF, 10);
        scene.add(spotLight);
        spotLight.castShadow = true;

        const sLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(sLightHelper);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle( new THREE.Vector3(0, 1, 0), Math.PI/2 );

        const vector = new THREE.Vector3(0, 0, 0);
        vector.applyQuaternion( quaternion );

        scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);

        // GUI
        const gui = new GUI();
        const options = {
            boxColor: 0xffea00,
            sphereColor: 0x00ff00,
            wireframeBox: false,
            wireframeSphere: false,
            speed: 0.01,
            angle: 0.2,
            penumbra: 0,
            intensity: 1

        }
        gui.addColor(options, 'boxColor').onChange(function(e){
            box.material.color.set(e)
        });
        gui.addColor(options, 'sphereColor').onChange(function(e){
            sphere.material.color.set(e)
        });
        gui.add(options, 'wireframeBox').onChange(function(e){
            box.material.wireframe = e;
        })
        gui.add(options, 'wireframeSphere').onChange(function(e){
            sphere.material.wireframe = e;
        })

        gui.add(options, 'speed', 0, 0.1);

        gui.add(options, 'angle', 0, 1);
        gui.add(options, 'penumbra', 0, 1);
        gui.add(options, 'intensity', 0, 10);

        let step = 0;

        const mousePosition = new THREE.Vector2;

        window.addEventListener('mousemove', function(e) {
            mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
        });

        const rayCaster = new THREE.Raycaster();
        const sphereID = sphere.id;

        // Animation loop with rotating cube
        const animate = () => {
            requestAnimationFrame(animate);

            box.rotation.x += 0.01;
            box.rotation.y += 0.01;

            step += options.speed;
            sphere.position.y = 10 * Math.abs(Math.sin(step));

            spotLight.angle = options.angle;
            spotLight.penumbra = options.penumbra;
            spotLight.intensity = options.intensity;
            sLightHelper.update();

            rayCaster.setFromCamera(mousePosition, camera);
            const intersects = rayCaster.intersectObjects(scene.children);
            console.log(intersects);

            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object.id === sphereID) {
                    intersects[i].object.material.color.set(0xFF0000);
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Cleanup
            gui.destroy();
            boxGeometry.dispose();
            boxMaterial.dispose();
            sphereGeometry.dispose();
            sphereMaterial.dispose();
            planeGeometry.dispose();
            planeMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF'
        }}>
        </div>
    );
}