import { useGLTF } from '@react-three/drei';

export default function RubiksCube() {

    const RubiksCube = useGLTF('./model/RubiksCube.glb');

    return (
        <primitive
            object={RubiksCube.scene}

        />

    );
}

useGLTF.preload('./model/RubiksCube.glb');