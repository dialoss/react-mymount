import {OrbitControls, PresentationControls, Stage} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {Suspense, useEffect, useState} from 'react';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {fetchRequest} from "api/requests";
import {registerPress} from "helpers/events";
import JSZip from "jszip"

const MyCanvas = ({ data }) => {
    function enableSelect() {
        document.body.style.userSelect = 'auto';
    }
    function disableSelect() {
        document.body.style.userSelect = 'none';
        registerPress();
    }
    return (
        <Canvas onMouseDown={disableSelect} onMouseUp={enableSelect}
                camera={{fov: 45}} style={{height:"400px"}}>
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

function uncompressFile(unzip, extension) {
    return unzip
        .then(files => files.file(new RegExp(extension))[0].async("arraybuffer"))
        .then(data => data);
}

const Model = ({data}) => {
    const [object, setObject] = useState(null);

    const query = new URL(data.url);
    const FILE_ID = query.searchParams.get('id');

    useEffect(() => {
        fetchRequest(FILE_ID).then(res => res.arrayBuffer()).then(modelArchive => {
            console.log(modelArchive)
            const zip = new JSZip();
            const loader = new GLTFLoader();
            const unzip = zip.loadAsync(modelArchive);
            let gltfFile = uncompressFile(unzip, 'gltf');
            let binFile = uncompressFile(unzip, 'bin');
            Promise.all([gltfFile, binFile]).then(files => {
                loader.parse(files[0], '/models/', obj => {
                    setObject(obj);
                })
            })
        });
    }, [])

    return (
        <>
            {!!object &&
                <primitive object={object.scene}
                           scale={10}
                           dispose={null}
                           position={[0, 0, 0]}>
                </primitive>
            }
        </>
    );
};