import { useRef } from 'react';
import { useControls } from 'leva';
import { useHelper } from '@react-three/drei';
import useStore from '../stores/useStore';
import * as THREE from 'three';

export default function Light() {

    const { lightIntensity, lightColor } = useStore(state => ({
        lightIntensity: state.lightIntensity,
        lightColor: state.lightColor,
    }));

    const pointLightRef = useRef();
    const pointLightRefBlue = useRef();
    const pointLightRefGreen = useRef();

    // Utilisation de Leva pour ajuster les paramètres de lumière
    useControls('Light', {
        lightIntensity: { value: lightIntensity, min: 0, max: 150000, onChange: (value) => useStore.setState({ lightIntensity: value }) },
        lightColor: { value: lightColor, onChange: (value) => useStore.setState({ lightColor: value }) },
    });

    useHelper(pointLightRef, THREE.PointLightHelper, 1, 'green')
    useHelper(pointLightRefBlue, THREE.PointLightHelper, 1, 'blue')
    // useHelper(pointLightRefGreen, THREE.PointLightHelper, 1, 'green')


    return (

        <>
            {/* <spotLight position={[0, 6.5, 0]} intensity={100}  castShadow /> */}
            <pointLight
                ref={pointLightRef}
                position={[0, 2.5, 0]}
                intensity={lightIntensity}
                castShadow
                rotation={[0, 0, 1]}
                scale={[10, 10, 10]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                color={lightColor}

            />
            {/* <pointLight
                ref={pointLightRefBlue}
                position={[-3.25, 0.35, -2.05]}
                intensity={50000}
                distance={0.40 * 50}
                scale={[2.5, 2.5, 2.5]}
                color={"blue"}
            /> */}
            <pointLight
                ref={pointLightRefGreen}
                position={[-3.25, 0.35, -2.05]}
                intensity={50000}
                distance={0.40 * 50}
                scale={[0.05, 0.05, 0.05]}
                color={"Green"}
            />

            <ambientLight intensity={0.5} />
        </>

    );
}