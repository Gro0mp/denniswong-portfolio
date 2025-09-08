import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
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
          <cylinderGeometry args={size} />
          <meshLambertMaterial color={color} emissive={color} />
      </mesh>
    );
}

export const WebGPUTest = () => {

    return (
      <Canvas style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'center', alignItems: 'center'}}>
          <OrbitControls enableZoom={true} enablePan></OrbitControls>
          <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>

          <color attach={`background`} args={[`#F0F0F0`]}></color>

          <RotatingCube></RotatingCube>

      </Canvas>
    );
}