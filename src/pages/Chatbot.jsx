import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Component for the 3D model
function LapwingModel() {
    const { scene } = useGLTF('/models/lapwing.glb', true);

    return (
        <primitive
            object={scene}
            position={[0, 0.5, 0]}
            scale={[1, 1, 1]}
        />
    );
}

// Fallback cube component
function FallbackCube() {
    return (
        <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color={0x00ff88} />
        </mesh>
    );
}

// Scene components
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.6} color={0x404040} />
            <directionalLight
                intensity={0.8}
                position={[10, 10, 5]}
                color={0xffffff}
            />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshLambertMaterial color={0xcccccc} side={2} />
            </mesh>

            {/* Try to load model, fallback to cube */}
            <React.Suspense fallback={<FallbackCube />}>
                <LapwingModel />
            </React.Suspense>

            {/* Orbit controls */}
            <OrbitControls
                enableDamping={true}
                dampingFactor={0.05}
                screenSpacePanning={false}
                minDistance={1}
                maxDistance={100}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    );
}

export const Chatbot = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1
        }}>
            <Canvas
                camera={{
                    position: [0, 5, 10],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: false
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};