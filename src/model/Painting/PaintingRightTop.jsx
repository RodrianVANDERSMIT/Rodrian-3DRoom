import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function PaintingRightTop() {

    const PaintingRightTopImg = useGLTF('./model/RightPaintingTopImg.glb');

    // const paintingRightTopTexture = useTexture('./bakeImg/DiplomeDWWMVDSRODRIAN.jpg');
    const paintingRightTopTexture = useTexture('./bakeImgWebp/DiplomeDWWMVDSRODRIAN.webp');
    paintingRightTopTexture.flipY = false;

    // Apply the baked texture to all meshes
    PaintingRightTopImg.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ map: paintingRightTopTexture, side: THREE.DoubleSide, });
        }
    });


    return (
        <primitive
            object={PaintingRightTopImg.scene}
        />

    );
}

useGLTF.preload('./model/RightPaintingTopImg.glb');
