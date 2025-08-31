import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Component to set scene background
function SceneBackground() {
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color('white');
    }, [scene]);
    return null;
}

const Cube = ({position, size, color}) => {

    const ref = useRef(null);

    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        console.log(delta);
    })

    return (
      <mesh position={position} ref={ref}>
          <boxGeometry args={size} />
          <meshStandardMaterial color={color} />
      </mesh>
    );
}

const Sphere = ({position, size, color}) => {
    return (
      <mesh position={position}>
          <sphereGeometry args={size} />
          <meshStandardMaterial color={color} />
      </mesh>
    );
}

function FadeOut ({ref, onDone}) {

    useFrame(() => {
        if (ref.current) {
            ref.current.opacity = THREE.MathUtils.lerp(
                ref.current.opacity,
                0,
                0.05
            );

            if (ref.current.opacity< 0.05) {
                ref.current.opacity = 0;
                if (onDone) onDone(ref.current);
            }
        }
    });
    return null;
}

function Pop({sphereRef, onDone}) {
    return <FadeOut material={sphereRef} onDone={onDone} />
}

function Push() {

}

const LinkedListVisualizer = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full h-96">
                <Canvas>
                    <directionalLight position={[0, 0, 2]} color="white" intensity={1}/>
                    <ambientLight intensity={0.3}/>
                    <Sphere position={[0, 0, 0]} args={[1, 30, 30]} color={`orange`}/>
                    <Sphere position={[0, 0, 0]} args={[1, 30, 30]} color={`red`}/>
                </Canvas>
            </div>
        </div>
    );
}

export default LinkedListVisualizer;