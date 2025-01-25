import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';

import SoundAnimation from './SoundSystem/SoundAnimation';

import useStore from '../../stores/useStore';

export default function Model2() {

    // const bakedTexture2 = useTexture('./bakeImg/BakedRoomRoroObject2.jpg');
    const bakedTexture2 = useTexture('./bakeImgWebp/BakedRoomRoroObject2.webp');
    bakedTexture2.flipY = false;

    // Desk drawer
    const deskDrawer = useGLTF('./model/object2/DeskDrawer.glb');

    const deskDrawerTop = useGLTF('./model/object2/DrawerTop.glb');
    const deskDrawerMiddle = useGLTF('./model/object2/DrawerMiddle.glb');
    const deskDrawerBot = useGLTF('./model/object2/DrawerBot.glb');

    //Desk / screendesk / TV / table TV / soundDesk / soundTv / pineapple / computer (merged2 + mergedDesk)
    const model2 = useGLTF('./model/object2/RoroRoomObject2.glb');
    // console.log(model2)

    //BigTv
    const BigTv = useGLTF('./model/object2/BigTv.glb');

    //window
    const rightWindow = useGLTF('./model/object2/WindowRight.glb');
    const leftWindow = useGLTF('./model/object2/WindowLeft.glb');

    //door
    const Door = useGLTF('./model/object2/Door.glb');

    //doorTV 
    const leftDoorTvTable = useGLTF('./model/object2/LeftDoorTv.glb');
    const rightDoorTvTable = useGLTF('./model/object2/RightDoorTv.glb');

    const switchConsole = useGLTF('./model/object2/SwitchConsole.glb');


    const animationTvLeft = useStore((state) => state.animationTvLeft);
    const setAnimationTvLeft = useStore((state) => state.setAnimationTvLeft);
    const animationTvRight = useStore((state) => state.animationTvRight);
    const setAnimationTvRight = useStore((state) => state.setAnimationTvRight);


    //apply baked texture to all meshes in the primitives
    useEffect(() => {
        rightWindow.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2 })
            }
        });
        leftWindow.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: bakedTexture2,
                    roughness: 0.5,
                    metalness: 0.5,
                });
            }
        });
        leftDoorTvTable.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
        rightDoorTvTable.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
        BigTv.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2 })
                child.castShadow = true
            }
        });
        Door.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2 })
            }
        });
        deskDrawer.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
        deskDrawerTop.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
        deskDrawerMiddle.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
        deskDrawerBot.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: bakedTexture2, side: THREE.DoubleSide })
            }
        });
    }, []);


    // animation for tv table
    const { actions: leftActions, names: leftNames, mixer: leftTvMixer } = useAnimations(leftDoorTvTable.animations, leftDoorTvTable.scene)
    const { actions: rightActions, names: rightNames, mixer: rightTvMixer } = useAnimations(rightDoorTvTable.animations, rightDoorTvTable.scene)
    const { actions: drawerTopActions, names: drawerTopNames, mixer: drawerTopMixer } = useAnimations(deskDrawerTop.animations, deskDrawerTop.scene)

    const optionsWithNone = ['off', ...leftNames, ...rightNames]

    //control animation
    const { leftDoorTvAnimation, rightDoorTvAnimation, deskDrawerTopAnimation } = useControls({
        leftDoorTvAnimation: { options: ['off', ...leftNames], value: 'off' },
        rightDoorTvAnimation: { options: ['off', ...rightNames], value: 'off' },
        deskDrawerTopAnimation: { options: ['off', ...drawerTopNames], value: 'off' }

    });

    // Play the selected animation
    useEffect(() => {
        if (deskDrawerTopAnimation && drawerTopActions[deskDrawerTopAnimation]) {
            const drawerTopAction = drawerTopActions[deskDrawerTopAnimation]
            drawerTopAction.reset().fadeIn(0.5).play()
            return () => {
                drawerTopAction.fadeOut(0.5).stop()
            };
        }
    }, [deskDrawerTopAnimation, drawerTopActions])

    useEffect(() => {
        if (leftDoorTvAnimation && leftActions[leftDoorTvAnimation]) {
            const leftAction = leftActions[leftDoorTvAnimation]
            leftAction.reset().fadeIn(0.5).play()
            return () => {
                leftAction.fadeOut(0.5).stop()
            };
        }
    }, [leftDoorTvAnimation, leftActions])

    useEffect(() => {
        if (rightDoorTvAnimation && rightActions[rightDoorTvAnimation]) {
            const rightAction = rightActions[rightDoorTvAnimation]
            rightAction.reset().fadeIn(0.5).play()
            return () => {
                rightAction.fadeOut(0.5).stop()
            };
        }
    }, [rightDoorTvAnimation, rightActions])

    //play animation when animationTvLeft is true
    useEffect(() => {
        if (animationTvLeft) {
            const leftAction = leftActions['LeftTvDoorOpen']
            leftAction.setLoop(THREE.LoopOnce, 1)
            leftAction.reset().fadeIn(0.5).play()
            leftAction.clampWhenFinished = true

            const onFinished = () => {
                setAnimationTvLeft(false)
                leftTvMixer.removeEventListener('finished', onFinished)
            }

            leftTvMixer.addEventListener('finished', onFinished)

            return () => {
                leftAction.stop()
                leftTvMixer.removeEventListener('finished', onFinished)
            }
        }
    }, [animationTvLeft])

    //play animation when animationTvRight is true
    useEffect(() => {
        if (animationTvRight) {
            const rightAction = rightActions['OpenDoorTvRight']
            rightAction.setLoop(THREE.LoopOnce, 1)
            rightAction.reset().fadeIn(0.5).play()
            rightAction.clampWhenFinished = true

            const onFinished = () => {
                setAnimationTvRight(false)
                rightTvMixer.removeEventListener('finished', onFinished)
            }

            rightTvMixer.addEventListener('finished', onFinished)

            return () => {
                rightAction.stop()
                rightTvMixer.removeEventListener('finished', onFinished)
            }
        }
    }, [animationTvRight])



    // update the mixer on each frame
    useFrame((state, delta) => {
        leftTvMixer.update(delta);
        rightTvMixer.update(delta);
        drawerTopMixer.update(delta);
    });



    const [rightWindowPosition, setRightWindowPosition] = useState([0, 0, 0]);
    const [leftWindowPosition, setLeftWindowPosition] = useState([0, 0, 0]);

    // open and close the windows
    const toggleRightWindowPosition = () => {
        // console.log(rightWindowPosition);
        if (rightWindowPosition[0] === 0) {
            setRightWindowPosition([-1, 0, 0]);
        } else {
            setRightWindowPosition([0, 0, 0]);
        }
    };

    const toggleLeftWindowPosition = () => {
        // console.log(leftWindowPosition);
        if (leftWindowPosition[0] === 0) {
            setLeftWindowPosition([1, 0, 0]);
        } else {
            setLeftWindowPosition([0, 0, 0]);
        }
    }

    return (
        <>

            <mesh
                geometry={model2.nodes.Merged2.geometry}
                castShadow
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh
                geometry={model2.nodes.MergedDesk.geometry}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                />
            </mesh>
            <mesh
                geometry={model2.nodes.MergedAmpli.geometry}
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                />
            </mesh>
            <mesh
                geometry={model2.nodes.PlantDesk.geometry}
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <primitive
                object={leftDoorTvTable.scene}
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                />
            </primitive>
            <primitive
                object={rightDoorTvTable.scene}
            />
            <primitive
                object={rightWindow.scene}
                position={rightWindowPosition}
                onClick={(event) => {
                    event.stopPropagation();
                    toggleRightWindowPosition();
                }}
            />
            <primitive
                object={leftWindow.scene}
                position={leftWindowPosition}
                onClick={(event) => {
                    event.stopPropagation();
                    toggleLeftWindowPosition()
                }}
            />
            <primitive
                object={BigTv.scene}
            />
            <primitive
                object={Door.scene}
            />

            <primitive
                object={deskDrawer.scene}
            />


            <primitive
                object={deskDrawerTop.scene}
            />
            <primitive
                object={deskDrawerMiddle.scene}
            />
            <primitive
                object={deskDrawerBot.scene}
            />
            <mesh
                geometry={switchConsole.nodes.MergedSwitch.geometry}
                castShadow
            >
                <meshStandardMaterial
                    map={bakedTexture2}
                />
            </mesh>
            <mesh
                geometry={switchConsole.nodes.SwitchScreen.geometry}
            />

            <SoundAnimation />
        </>

    );
}

useGLTF.preload('./model/object2/DeskDrawer.glb');
useGLTF.preload('./model/object2/DrawerTop.glb');
useGLTF.preload('./model/object2/DrawerMiddle.glb');
useGLTF.preload('./model/object2/DrawerBot.glb');
useGLTF.preload('./model/object2/RoroRoomObject2.glb');
useGLTF.preload('./model/object2/BigTv.glb');
useGLTF.preload('./model/object2/WindowRight.glb');
useGLTF.preload('./model/object2/WindowLeft.glb');
useGLTF.preload('./model/object2/Door.glb');
useGLTF.preload('./model/object2/LeftDoorTv.glb');
useGLTF.preload('./model/object2/RightDoorTv.glb');
useGLTF.preload('./model/object2/SwitchConsole.glb');
