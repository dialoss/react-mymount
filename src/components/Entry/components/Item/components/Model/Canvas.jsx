import {OrbitControls, PresentationControls, Stage} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {Suspense, useEffect, useState} from 'react';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {fetchRequest} from "api/requests";
import {registerPress} from "helpers/events";
import JSZip from "jszip"
import {Mesh, MeshBasicMaterial, MeshStandardMaterial} from "three";

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
                    <OrbitControls zoomSpeed={5} onWheel={(e)=>false}/>
                </Stage>
            </Suspense>

        </Canvas>
    );
};

export default MyCanvas;

const Lights = () => {
    return (
        <>
            <ambientLight intensity={1}/>
            <directionalLight position={[10, 10, 10]} intensity={1} color={"#fff"}></directionalLight>
            <directionalLight position={[-10, -10, -10]} intensity={1} color={"#fff"}></directionalLight>
            <directionalLight position={[10, 10, 0]} intensity={1} />
            <directionalLight position={[-10, 0, 0]} intensity={1} />
            <directionalLight position={[0, 10, 0]} intensity={1} />
            <directionalLight position={[0, 0, 10]} intensity={1} />
            {/*<directionalLight position={[0, 0, -10]} intensity={1} />*/}
            {/*<directionalLight position={[0, -10, 0]} intensity={1} />*/}
        </>
    );
};

const Model = ({data}) => {
    const [model, setModel] = useState(null);

    const query = new URL(data.url);
    const FILE_ID = query.searchParams.get('id');

    useEffect(() => {
        fetchRequest(FILE_ID).then(res => res.arrayBuffer()).then(file => {
            const loader = new GLTFLoader();
            loader.parse(file, '', model => {
                model.scene.traverse((obj) => {
                        if(obj instanceof Mesh){
                            obj.material = new MeshStandardMaterial({
                                color: obj.material.color,
                                roughness: "0.1",
                                metalness: "0.8",
                            });
                        }
                    }
                )
                setModel(model);
            });
        });
    }, [])

    return (
        <>
            {!!model &&
                <primitive object={model.scene}
                           scale={10}
                           dispose={null}
                           position={[0, 0, 0]}>
                </primitive>
            }
        </>
    );
};