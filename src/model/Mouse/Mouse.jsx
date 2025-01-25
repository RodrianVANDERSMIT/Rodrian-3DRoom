import { useGLTF } from '@react-three/drei';

export default function Mouse() {

    const MouseModel = useGLTF('./model/RoroRoomMouse.glb');

    return (
        <primitive
            object={MouseModel.scene}

        />

    );
}

useGLTF.preload('./model/RoroRoomMouse.glb');