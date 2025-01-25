import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';


export default function Model1() {


    //Merged + TableTvMerged + paintingleftimg + paintingrightbotimg
    const model1 = useGLTF('./model/object1/RoroRoomObject1.glb');

    const ScreenModel = useGLTF('./model/object1/Screen.glb');
    // console.log(ScreenModel);
    // console.log(model1);
    // const bakedTexture1 = useTexture('./bakeImg/BRoom1.jpg');
    const bakedTexture1 = useTexture('./bakeImgWebp/BRoom1.webp');
    bakedTexture1.flipY = false;
    // const paintingLeftTexture = useTexture('./bakeImg/VanGogh.jpg')
    const paintingLeftTexture = useTexture('./bakeImgWebp/VanGogh.webp')
    paintingLeftTexture.flipY = false;

    // const paintingBotLeftTexture = useTexture('./bakeImg/CertificateThreeJsVanDerSmit.png')
    const paintingBotLeftTexture = useTexture('./bakeImgWebp/CertificateThreeJsVanDerSmit.webp')


    paintingBotLeftTexture.flipY = false;

    return (

        <>
            <mesh
                geometry={model1.nodes.Merged.geometry}
                castShadow
                receiveShadow

            >
                <meshStandardMaterial
                    map={bakedTexture1}
                    roughness={0.5}
                    metalness={0.5}
                />
            </mesh>
            <mesh
                geometry={model1.nodes.PaintingLeftImg.geometry}
            >
                <meshStandardMaterial
                    map={paintingLeftTexture}
                />
            </mesh>
            <mesh
                geometry={model1.nodes.TableTvMerged.geometry}
                castShadow
            >
                <meshStandardMaterial
                    map={bakedTexture1}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh
                geometry={model1.nodes.PaintingRightBotImg.geometry}
            >
                <meshStandardMaterial
                    map={paintingBotLeftTexture}

                />
            </mesh>
            <primitive
                object={ScreenModel.scene}
            />
        </>

    );
}

useGLTF.preload('./model/object1/RoroRoomObject1.glb');
useGLTF.preload('./model/object1/Screen.glb');