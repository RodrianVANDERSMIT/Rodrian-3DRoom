import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';
import useStore from './../../../stores/useStore';


export default function SoundAnimation() {

    const { isPlaying } = useStore((state) => state);

    //soundAnimation
    const soundAnimation = useGLTF('./model/object2/SoundAnimation.glb');

    //clone soundAnimation
    const clonedSoundAnimation1 = {
        scene: soundAnimation.scene.clone(),
        animations: soundAnimation.animations.map((clip) => {
            return THREE.AnimationClip.parse(THREE.AnimationClip.toJSON(clip));
        }),
    };

    const clonedSoundAnimation2 = {
        scene: soundAnimation.scene.clone(),
        animations: soundAnimation.animations.map((clip) => {
            return THREE.AnimationClip.parse(THREE.AnimationClip.toJSON(clip));
        }),
    };

    const clonedSoundAnimation3 = {
        scene: soundAnimation.scene.clone(),
        animations: soundAnimation.animations.map((clip) => {
            return THREE.AnimationClip.parse(THREE.AnimationClip.toJSON(clip));
        }),
    };



    //soundAnimation LEVA control
    const { actions: soundActions, names: soundNames, mixer: soundMixer } = useAnimations(soundAnimation.animations, soundAnimation.scene)
    const { actions: soundActions1, mixer: soundMixer1 } = useAnimations(clonedSoundAnimation1.animations, clonedSoundAnimation1.scene);
    const { actions: soundActions2, mixer: soundMixer2 } = useAnimations(clonedSoundAnimation2.animations, clonedSoundAnimation2.scene);
    const { actions: soundActions3, mixer: soundMixer3 } = useAnimations(clonedSoundAnimation3.animations, clonedSoundAnimation3.scene);

    const optionsWithNone = ['off', ...soundNames]

    //control animation
    const { soundAnimationControl } = useControls({
        soundAnimationControl: { options: ['off', 'on'], value: 'off' },
    });

    //  on/off sound animation
    const [soundAnimationVisible, setSoundAnimationVisible] = useState(soundAnimationControl === 'on');

    useEffect(() => {
        if (soundAnimationControl === 'on' || isPlaying) {
            setSoundAnimationVisible(true)
            Object.values(soundActions).forEach(action => action.reset().fadeIn(0.5).play())
            Object.values(soundActions1).forEach(action => action.reset().fadeIn(0.5).play())
            Object.values(soundActions2).forEach(action => action.reset().fadeIn(0.5).play())
            Object.values(soundActions3).forEach(action => action.reset().fadeIn(0.5).play())

            return () => {
                Object.values(soundActions).forEach(action => action.fadeOut(0.5).stop())
                Object.values(soundActions1).forEach(action => action.fadeOut(0.5).stop())
                Object.values(soundActions2).forEach(action => action.fadeOut(0.5).stop())
                Object.values(soundActions3).forEach(action => action.fadeOut(0.5).stop())
            };

        } else {
            setSoundAnimationVisible(false)
            Object.values(soundActions).forEach(action => action.fadeOut(0.5).stop())
            Object.values(soundActions1).forEach(action => action.fadeOut(0.5).stop())
            Object.values(soundActions2).forEach(action => action.fadeOut(0.5).stop())
            Object.values(soundActions3).forEach(action => action.fadeOut(0.5).stop())
        }

    }, [soundAnimationControl, isPlaying, soundActions, soundActions1, soundActions2, soundActions3]);


    // update the mixer on each frame
    useFrame((state, delta) => {
        soundMixer.update(delta);
        soundMixer1.update(delta);
        soundMixer2.update(delta);
        soundMixer3.update(delta);
    });

    return (
        <>
            <primitive
                object={soundAnimation.scene}
                visible={soundAnimationVisible}
                position={[0, 0, 0]}
                onClick={() => setSoundAnimationVisible(!soundAnimationVisible)}
            />
            <primitive
                object={clonedSoundAnimation1.scene}
                visible={soundAnimationVisible}
                position={[2.61, 0, 0]}
                onClick={() => setSoundAnimationVisible(!soundAnimationVisible)}
            />
            <primitive
                object={clonedSoundAnimation2.scene}
                visible={soundAnimationVisible}
                rotation-y={Math.PI / 2}
                scale={[0.4, 0.4, 0.4]}
                position={[-2.675, 0.912, -0.145]}
                onClick={() => setSoundAnimationVisible(!soundAnimationVisible)}
            />
            <primitive
                object={clonedSoundAnimation3.scene}
                visible={soundAnimationVisible}
                rotation-y={Math.PI / 2}
                scale={[0.4, 0.4, 0.4]}
                position={[-2.71, 0.912, -1.49]}
                onClick={() => setSoundAnimationVisible(!soundAnimationVisible)}
            />

        </>
    );
}