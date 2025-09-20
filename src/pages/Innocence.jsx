import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls, Sparkles, useAspect} from "@react-three/drei";
import {FirstPersonControls} from "@react-three/drei";
import React, {useRef} from "react";
import {TextureLoader} from "three";
import * as THREE from "three";

export const Innocence = () => {



    function ImagePlane({imageURL, width, height, position}) {
        const texture = useLoader(THREE.TextureLoader, imageURL);

        const viewport = useThree(state => state.viewport);
        return (
            <mesh position={position} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry attach="geometry" position={[width, height]}/>
                <meshLambertMaterial attach="material" map={texture} transparent={true}/>
            </mesh>
        );

    }
    

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1}}>

            <Canvas>
                <ambientLight/>
                <ImagePlane imageURL={"/Panels/Innocence/Innocence_0008_Original.png"} width={100} height={100} position={[0, 0, 0]}/>
                <OrbitControls /> {/* This enables camera controls, including zoom */}
            </Canvas>
        </div>
    );
}