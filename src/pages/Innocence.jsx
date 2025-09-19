import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {OrbitControls, Sparkles} from "@react-three/drei";
import {FirstPersonControls} from "@react-three/drei";
import {useRef} from "react";
import {TextureLoader} from "three";
import * as THREE from "three";

export const Innocence = () => {

    function ImagePlane({imageURL, width, height, position}) {
        const texture = useLoader(THREE.TextureLoader, imageURL);

        return (
            <mesh position={position}>
                <planeGeometry attach="geometry" position={[width, height]}/>
                <meshLambertMaterial attach="material" map={texture} transparent={true}/>
            </mesh>
        );

    }

    return (
       <Canvas>
           <ambientLight/>
           <ImagePlane imageURL={"/Panels/Innocence/Innocence_0008_Original.png"} width={5} height={5} position={[0, 0, 0]}/>
           <OrbitControls /> {/* This enables camera controls, including zoom */}
       </Canvas>
    );
}