import { OrbitControls, Html } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import useStore from './stores/useStore';

import Boo from './model/Boo/Boo';
import Floor from './model/Floor/Floor';
import Model1 from './model/Model1/Model1';
import Model2 from './model/Model2/Model2';
import Light from './Config/Light';
import Keyboard from './model/Keyboard/Keyboard.jsx';
import Mouse from './model/Mouse/Mouse.jsx';
import CoffeCup from './model/CoffeeCup/CoffeeCup.jsx';
import RubiksCube from './model/RubiksCube/RubiksCube.jsx';
import PaintingRightTop from './model/Painting/PaintingRightTop.jsx';
import CvModel from './model/CvModel/CvModel.jsx';
import Cat from './model/Cat/Cat';
import Chair from './model/Chair/Chair';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const IframeWrapper = ({ wrapperClass, transform, distanceFactor, position, rotation, src, title }) => {
    const isLoading = useStore((state) => state.isLoading);

    if (isLoading) return null;

    return (
        <Html
            wrapperClass={wrapperClass}
            transform={transform}
            distanceFactor={distanceFactor}
            position={position}
            rotation={rotation}
        >
            <iframe
                src={src}
                sandbox="allow-scripts allow-same-origin allow-popups"
                title={title}
            />
        </Html>
    );
};

export default function Experience() {
    const { scene } = useThree();

    // scale the scene for iphone 
    useEffect(() => {
        scene.scale.set(50, 50, 50); // Modifier cette valeur selon vos besoins
    }, [scene]);

    return (
        <>

            <color args={["#241a1a"]} attach="background" />

            <Light />
            {/* <OrbitControls /> */}

            <Floor />
            <Model1 />
            <Model2 />
            <Boo />
            <Keyboard />
            <Mouse />
            <CoffeCup />
            <RubiksCube />
            <PaintingRightTop />
            <CvModel />
            <Cat />
            <Chair />
            <IframeWrapper
                wrapperClass='htmlScreenLeft'
                transform
                distanceFactor={0.41}
                position={[-3.78638, 1.40568, -0.760753]}
                rotation={[0, 7.97, 0]}
                src="https://rodrian-race.vercel.app/"
                title="Rodrian Race"
            />
            <IframeWrapper
                wrapperClass='htmlScreenRight'
                transform
                distanceFactor={0.29}
                position={[-3.79187, 1.40568, -1.67714]}
                rotation={[0, 1.45, 0]}
                src="https://rodrian-van-der-smit.vercel.app/"
                title="Rodrian Portfolio"
            />
            <IframeWrapper
                wrapperClass='htmlScreen'
                transform
                distanceFactor={0.73}
                position={[2.3592, 1.2057, -2.85771]}
                src="https://portal-rodrian.vercel.app/"
                title="Portal Rodrian"
            />



        </>
    );
}