
import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';


export default function Floor() {

    //floor
    const modelFloor = useGLTF('./model/RoroFloorTest.glb');
    // const bakedTextureFloor = useTexture('./bakeImg/RoroRoomFloor.jpg');
    const bakedTextureFloor = useTexture('./bakeImgWebp/RoroRoomFloor.webp');
    // console.log(modelFloor)


    return (
        <mesh
            geometry={modelFloor.nodes.Plan.geometry}
            receiveShadow
        >
            <meshStandardMaterial
                map={bakedTextureFloor}
                side={THREE.DoubleSide}
            />
        </mesh>

    );
}

useGLTF.preload('./model/RoroFloorTest.glb');