import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import {PresentationControls, Stage, useGLTF} from "@react-three/drei";

function Model(props) {
    const { scene } = useGLTF('/models/apartment/scene.gltf');
    return <primitive object={scene} {...props}/>
}

export function Scene() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 1.6, 3], fov: 50 }} shadows={true}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7.5]} intensity={1} castShadow="true"/>
            <PresentationControls speed={1.5} global zoom={0.8} polar={[-0.2, Math.PI / 4]}>
                <Stage>
                    <Model position={[0, -1, 0]} />
                </Stage>
            </PresentationControls>
            <Model position={[0, -1, 0]} />
        </Canvas>
    );
}