import {OrbitControls, PresentationControls, Stage} from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, {Suspense, useEffect, useState} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {listFiles} from "../../../../../GooglePicker/api/picker";
import {fetchRequest} from "../../../../../../api/requests";

const MyCanvas = ({ data }) => {
    return (
        <Canvas
                camera={{fov: 45}} style={{height:"300px"}}>
            <color attach={"background"} args={["rgb(255,255,255)"]}></color>
            <Lights />

            <Suspense fallback={null}>
                <Stage environment={null}>
                    <Model data={data} />
                    <OrbitControls zoomSpeed={5}/>
                </Stage>
            </Suspense>

        </Canvas>
    );
};

export default MyCanvas;

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.4}/>
            <directionalLight position={[10, 10, 10]} intensity={1} color={"#fff"}></directionalLight>
            <directionalLight position={[-10, -10, -10]} intensity={1} color={"#fff"}></directionalLight>
            {/*<directionalLight position={[10, 10, 0]} intensity={1} />*/}
            {/*<directionalLight position={[-10, 0, 0]} intensity={1} />*/}
            {/*<directionalLight position={[0, 10, 0]} intensity={1} />*/}
            {/*<directionalLight position={[0, 0, 10]} intensity={1} />*/}
            {/*<directionalLight position={[0, 0, -10]} intensity={1} />*/}
            {/*<directionalLight position={[0, -10, 0]} intensity={1} />*/}
        </>
    );
};

const Model = ({data}) => {
    // fetchRequest("1s5c_vwxbA6eiV7YQ30ePgjHqlAukyZkb")
    // listReactFiles(__models).then(files => console.log(files))

    const arr = ['MT-20-100LHN', 'Крышка кронштейна двигателя Nema17AZ','17HS15-1684-HG10', 'MT-20-100H']
    const object = useLoader(GLTFLoader, `/models/${arr[0]}.gltf`);
    // const [object, setObject] = useState({});
    // const object = useLoader(GLTFLoader, '/test.gltf');
    // listFiles().then(arrayBuffer => {
    //     STLLoader.parse(arrayBuffer, '', (obj) => {
    //         let loader = new STLLoader();
    //         setObject(loader.load(obj))
    //         // setObject(useLoader(STLLoader, obj));
    //     });
    // });

    return (
        <>
            {/*<primitive object={object} attach="geometry" scale={0.01}></primitive>*/}
            <primitive object={object.scene} scale={10} dispose={null} position={[0, 0, 0]}></primitive>
            {/*<meshStandardMaterial color={"green"}></meshStandardMaterial>*/}
        </>
    );
};