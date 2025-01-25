import { useEffect } from 'react';
import * as THREE from 'three';
import { useTexture, useGLTF, useAnimations } from '@react-three/drei';

import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

import useStore from '../../stores/useStore';

export default function boo() {
    const animationTvLeft = useStore((state) => state.animationTvLeft);
    const setAnimationTvLeft = useStore((state) => state.setAnimationTvLeft);

    //boo
    const booModel = useGLTF('./model/Boo.glb');
    const { actions, names, mixer } = useAnimations(booModel.animations, booModel.scene);
    // console.log(booModel.animations)

    // const bakedBooTexture = useTexture('./bakeImg/BooBake.jpg');
    const bakedBooTexture = useTexture('./bakeImgWebp/BooBake.webp');
    bakedBooTexture.flipY = false;

    const optionsWithNone = ['off', ...names];

    // Add a control to select the animation
    const { BooAnimation } = useControls({
        BooAnimation: { options: optionsWithNone, value: 'off' },
    });


    // Apply the baked texture to all meshes in the booModel.scene
    useEffect(() => {
        booModel.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedBooTexture });
            }
        });
    }, [booModel, bakedBooTexture]);

    // Play the selected animation
    useEffect(() => {
        if (BooAnimation && actions[BooAnimation]) {
            const action = actions[BooAnimation];
            action.reset().fadeIn(0.5).play();
            return () => {
                action.fadeOut(0.5).stop();
            };
        }
    }, [BooAnimation, actions]);

    // Play the BooFlip animation once when animationTvLeft is true
    useEffect(() => {
        if (animationTvLeft) {
            const action = actions['BooFlip'];
            action.setLoop(THREE.LoopOnce, 1); //  play once
            action.reset().fadeIn(0.5).play();
            action.clampWhenFinished = true; //  stops at the last frame

            const onFinished = () => {
                setAnimationTvLeft(false);
                mixer.removeEventListener('finished', onFinished);
            };

            mixer.addEventListener('finished', onFinished);

            return () => {
                action.stop();
                mixer.removeEventListener('finished', onFinished);
            };
        }
    }, [animationTvLeft]);


    useFrame((state, delta) => {
        mixer.update(delta);
    });

    return (
        <primitive
            object={booModel.scene}
        />
    );
}
useGLTF.preload('./model/Boo.glb');