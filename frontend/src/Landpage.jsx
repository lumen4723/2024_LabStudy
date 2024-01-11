import "./Landpage.css";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Cylinder(props) {
    const meshRef = useRef();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame((state, delta) => {
        meshRef.current.rotation.z += delta * 1.5;
        meshRef.current.rotation.x += delta / 2.5;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 2 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <cylinderGeometry args={[1, 1, 0.1, 64]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}

const Landpage = () => {
    return (
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
            />
            <Cylinder position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </Canvas>
    );
};

// const Landpage = () => {
//     return (
//         <>
//             <div className="landpage">
//                 <h1>Landpage</h1>
//             </div>
//             <Link to="/">
//                 <p>root</p>
//             </Link>
//             <Link to="/login">
//                 <p>login</p>
//             </Link>
//             <Link to="/signup">
//                 <p>signup</p>
//             </Link>
//             <Link to="/freeboard">
//                 <p>freeboard</p>
//             </Link>
//             <Link to="/freeboard/1">
//                 <p>freeboard/1</p>
//             </Link>
//             <Link to="/freeboard/write">
//                 <p>freeboard/write</p>
//             </Link>
//             <Link to="/freeboard/edit/1">
//                 <p>freeboard/edit/1</p>
//             </Link>
//             <Link to="/qnaboard">
//                 <p>qnaboard</p>
//             </Link>
//             <Link to="/qnaboard/1">
//                 <p>qnaboard/1</p>
//             </Link>
//             <Link to="/qnaboard/write">
//                 <p>qnaboard/write</p>
//             </Link>
//             <Link to="/qnaboard/edit/1">
//                 <p>qnaboard/edit/1</p>
//             </Link>
//             <Link to="/coinchart">
//                 <p>coinchart</p>
//             </Link>

//             <Link to="/undefined">
//                 <p>notfound</p>
//             </Link>
//         </>
//     );
// };

export default Landpage;
