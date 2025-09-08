import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef} from "react";

const RotatingCube = ({position, size, color}) => {

    const meshRef = useRef(null);
    return (
      <mesh ref={meshRef}>
        
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