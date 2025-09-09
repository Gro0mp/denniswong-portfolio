import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Sparkles} from "@react-three/drei";
import {FirstPersonControls} from "@react-three/drei";
import {useRef} from "react";

const RotatingCube = ({position, size, color}) => {

    const meshRef = useRef(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.01;
        }
    });
    return (
      <mesh ref={meshRef} position={position}>
          <boxGeometry args={size} />
          <meshLambertMaterial color={color} emissive={color} />

          <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color={`pink`}/>
      </mesh>
    );
}


export const WebGPUTest = () => {

    return (
      <Canvas style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'center', alignItems: 'center'}}>
          <OrbitControls enableZoom={true} enablePan></OrbitControls>
          <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>

          <color attach={`background`} args={[`#F0F0F0`]}></color>

          <RotatingCube position={[0, 0, 0]} size={[1, 1, 1]} color={`#468585`}/>
          <RotatingCube position={[1, 1, 0]} size={[1, 1, 1]} color={`#468585`}/>
          <RotatingCube position={[2, 2, 2]} size={[1, 1, 1]} color={`#468585`}/>

      </Canvas>
    );
}

