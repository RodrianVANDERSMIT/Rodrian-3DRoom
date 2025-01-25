import { useGLTF } from '@react-three/drei';

export default function Keyboard() {

    const keyboardModel = useGLTF('./model/RoroRoomKeyboard.glb');

    return (
        <primitive
            object={keyboardModel.scene}

        />

    );
}

useGLTF.preload('./model/RoroRoomKeyboard.glb');