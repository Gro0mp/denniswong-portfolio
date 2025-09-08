import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

export const WebGPUTest = () => {

    const Cube = ({position, size, color}) => {

    }
    return (
      <Canvas style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'center', alignItems: 'center'}}>
          <OrbitControls enableZoom={true} enablePan={}></OrbitControls>
          <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6}/>

          <color attach={`background`} args={``}></color>

      </Canvas>
    );
}