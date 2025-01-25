import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import useStore from '../stores/useStore'

const cameraPositions = {
    "Base": { x: 50 * 4.9, y: 50 * 3.6, z: 50 * 6.8, rotationX: -0.3912355791271742, rotationY: 0.5904571809359204, rotationZ: 0.22574126935531616 },
    "TV": { x: 50 * 2.1, y: 50 * 2.2, z: 50 * 3.1, rotationX: -0.21057195683620386, rotationY: 0, rotationZ: 0 },
    "Desk": { x: 50 * -1.7, y: 50 * 1.5, z: 50 * -1.2, rotationX: -1.570796326794896, rotationY: 1.4288992721907323, rotationZ: 1.570796326794896 },
    "Painting Top Right": { x: 50 * -3.0, y: 50 * 2.30, z: 50 * -2.48, rotationX: 0, rotationY: 0, rotationZ: 0 },
    "Painting Bot Right": { x: 50 * -3.0, y: 50 * 1.77, z: 50 * -2.48, rotationX: 0, rotationY: 0, rotationZ: 0 },
    "Screen Right": { x: 50 * -2.9, y: 50 * 1.43, z: 50 * -1.5, rotationX: 0, rotationY: 1.43, rotationZ: 0 },
    "Screen Left": { x: 50 * -2.9, y: 50 * 1.43, z: 50 * -0.9, rotationX: 0, rotationY: 1.7, rotationZ: 0 },
    "CvTop": { x: 50 * 1, y: 50 * 1.4, z: 50 * -2.2, rotationX: -0.25, rotationY: -0.02, rotationZ: 0 },
    "CvBot": { x: 50 * 1, y: 50 * 1.05, z: 50 * -2.1, rotationX: -0.25, rotationY: -0.02, rotationZ: 0 },
    "Cat": { x: 50 * -1.7, y: 50 * 1.3, z: 50 * 0.5, rotationX: -1.570796326794896, rotationY: 1.4288992721907323, rotationZ: 1.570796326794896 },
};

export default function CameraController() {
    const { camera } = useThree();
    const cameraPositionPreset = useStore((state) => state.cameraPositionPreset);



    useEffect(() => {
        const selectedcameraPositionPreset = cameraPositions[cameraPositionPreset];
        if (selectedcameraPositionPreset) {
            gsap.to(camera.position, {
                x: selectedcameraPositionPreset.x,
                y: selectedcameraPositionPreset.y,
                z: selectedcameraPositionPreset.z,
                duration: 2,
                ease: 'power2.inOut',
                delay: 0.5,
            });
            gsap.to(camera.rotation, {
                x: selectedcameraPositionPreset.rotationX,
                y: selectedcameraPositionPreset.rotationY,
                z: selectedcameraPositionPreset.rotationZ,
                duration: 2,
                ease: 'power2.inOut',
                delay: 0.5,
            });
            // console.log(`cameraPositionPreset "${cameraPositionPreset}" choose.`);
            // console.log(`Position camera : x: ${selectedcameraPositionPreset.x}, y: ${selectedcameraPositionPreset.y}, z: ${selectedcameraPositionPreset.z}`);
            // console.log(`Rotation camera : x: ${selectedcameraPositionPreset.rotationX}, y: ${selectedcameraPositionPreset.rotationY}, z: ${selectedcameraPositionPreset.rotationZ}`);

        }
    }, [cameraPositionPreset]);

    return null;
}