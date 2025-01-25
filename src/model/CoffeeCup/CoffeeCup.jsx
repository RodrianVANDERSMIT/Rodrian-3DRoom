import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function CofeeCup() {

    const coffeeCup = useGLTF('./model/CoffeeCupOclock.glb');

    // const oclockTexture = useTexture('./bakeImg/LogoOclock.jpg');
    const oclockTexture = useTexture('./bakeImgWebp/LogoOclock.webp');



    // Apply the baked texture to all meshes
    useEffect(() => {
        coffeeCup.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: oclockTexture, side: THREE.DoubleSide, });
            }
        });
    }, [coffeeCup, oclockTexture]);

    return (

        <primitive
            object={coffeeCup.scene}
        />
    );
}

useGLTF.preload('./model/CoffeeCupOclock.glb');