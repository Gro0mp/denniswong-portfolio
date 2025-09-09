import {usePlane} from "@react-three/cannon";
import {useRef} from "react";

export const Floor = ({ props }) => {
    const ref = usePlane((index) => ({ type: "static", mass: 0, ...props }));

    return (
        <mesh>
            <planeGeometry args={[1000, 1000]}/>
            <meshStandardMaterial color={props.color}/>
        </mesh>
    );
}