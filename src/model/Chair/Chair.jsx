import { useGLTF } from '@react-three/drei';


export default function Chair() {

	const chairModel = useGLTF('./model/RoroRoomChair.glb');

	chairModel.scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
		}
	});

	return (

		<primitive
			object={chairModel.scene}
			castShadow
		/>
	);
}

useGLTF.preload('./model/RoroRoomChair.glb');