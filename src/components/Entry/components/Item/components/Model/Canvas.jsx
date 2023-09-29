import {Center, OrbitControls, PresentationControls, Stage} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {Suspense, useEffect, useState} from 'react';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {fetchRequest} from "api/requests";
import {registerPress} from "helpers/events";
import JSZip from "jszip"
import {Mesh, MeshStandardMaterial} from "three";

const MyCanvas = ({ data }) => {
    function enableSelect() {
        document.body.style.userSelect = 'auto';
    }
    function disableSelect() {
        document.body.style.userSelect = 'none';
        registerPress();
    }
    return (
        <div style={{height:"400px", width:"100%"}}>
            <Canvas onMouseDown={disableSelect} onMouseUp={enableSelect} resize={{ scroll: false }}
                    camera={{fov: 45}}>
                <color attach={"background"} args={["rgb(255,255,255)"]}></color>
                <Lights />
                <Suspense fallback={null}>
                    <Stage preset={"soft"} environment={"sunset"} center={[-5,0,-10]}>
                        <Model data={data} />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate zoomSpeed={5} onWheel={(e)=>false}/>
            </Canvas>
        </div>
    );
};

export default MyCanvas;

const Lights = () => {
    return (
        <>
            {/*<ambientLight intensity={0.5}/> */}
            {/*<directionalLight position={[10, 10, 10]} intensity={1} color={"#fff"}></directionalLight>*/}
            {/*<directionalLight position={[-10, -10, -10]} intensity={1} color={"#fff"}></directionalLight>*/}
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
                <Center>
                    <primitive object={model.scene}
                               scale={10}
                               dispose={null}
                               position={[0, 0, 0]}>
                    </primitive>
                </Center>

            }
        </>
    );
};