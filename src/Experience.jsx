
import { OrbitControls, Html } from '@react-three/drei';
import { Perf } from 'r3f-perf';

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
            <Html
                wrapperClass='htmlScreenLeft'
                transform
                distanceFactor={0.41}
                position={[-3.78638, 1.40568, -0.760753]}
                rotation={[0, 7.97, 0]}
            >
                <iframe
                    src="https://rodrian-race.vercel.app/"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    title="Rodrian Race"
                />

            </Html>
            <Html
                wrapperClass='htmlScreenRight'
                transform
                distanceFactor={0.21}
                position={[-3.79187, 1.40568, -1.67714]}
                rotation={[0, 1.45, 0]}
            >

                <iframe

                    src="https://rodrianvandersmitportfolio2dfor3d.vercel.app/"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    title="Rodrian Portfolio"
                />
            </Html>
            <Html
                wrapperClass='htmlScreen'
                transform
                distanceFactor={0.73}
                position={[2.3592, 1.2057, -2.85771]}

            >
                <iframe src="https://portal-rodrian.vercel.app/" />

            </Html>



        </>
    );
}