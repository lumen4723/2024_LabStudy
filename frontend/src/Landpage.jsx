import "./Landpage.css";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
// import { Text } from "@react-three/drei";

const MovingCoin = (props) => {
    const meshRef = useRef();

    const [hover, setHover] = useState(false);

    const [initrotation, setInitrotation] = useState({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (!props.isdrag) {
            meshRef.current.rotation.z += delta * 0.8;
            meshRef.current.rotation.x += delta * 0.3;
        }
    });

    const bind = useDrag(({ offset: [x, y], first, last }) => {
        if (first) {
            setInitrotation({ x: x, y: y });
        }
        if (props.isdrag) {
            meshRef.current.rotation.x =
                Math.PI / 2 + (y - initrotation.y) / 200;
            meshRef.current.rotation.z = (initrotation.x - x) / 200;
            if (last) {
                props.setIsdrag(true);
            }
        }
    });

    return (
        <mesh
            {...props}
            {...bind()}
            ref={meshRef}
            scale={props.isdrag ? 2 : 1}
            onClick={(event) => {
                props.setIsdrag(!props.isdrag);
                if (!props.isdrag) {
                    meshRef.current.rotation.x = Math.PI / 2;
                    meshRef.current.rotation.y = 0;
                    meshRef.current.rotation.z = 0;
                }
            }}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <cylinderGeometry args={[1, 1, 0.1, 64]} />
            <meshStandardMaterial color={props.color} />
        </mesh>
    );
};

const StaticCoin = (props) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={hovered ? 1.5 : 1}
            onClick={(event) => {
                props.setColor(props.color);
            }}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
            <meshStandardMaterial color={props.color} />
        </mesh>
    );
};

const Landpage = () => {
    const [isdrag, setIsdrag] = useState(false);
    const [color, setColor] = useState("orange");

    return (
        <>
            <p className="coindes">
                {isdrag ? "" : "코인을 누르면 자유롭게 움직일 수 있습니다."}
            </p>
            <Canvas style={{ width: "100%", height: "100vh" }}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[0, 5, 10]}
                    angle={0.2}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                {/* <pointLight
                    position={[0, 5, 10]}
                    decay={0}
                    intensity={Math.PI}
                /> */}
                <MovingCoin
                    position={[0, 1, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    isdrag={isdrag}
                    setIsdrag={setIsdrag}
                    color={color}
                />
                <StaticCoin
                    position={[-1, isdrag ? -2 : -1, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    color="orange"
                    setColor={setColor}
                />
                <StaticCoin
                    position={[0, isdrag ? -2 : -1, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    color="silver"
                    setColor={setColor}
                />
                <StaticCoin
                    position={[1, isdrag ? -2 : -1, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    color="blue"
                    setColor={setColor}
                />
            </Canvas>
        </>
    );
};

export default Landpage;
