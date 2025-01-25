import { useGLTF } from '@react-three/drei';

export default function CofeeCup() {
	const CatModel = useGLTF('./model/RoroRoomCat.glb');

	// Traverse through the model and set castShadow for each mesh
	CatModel.scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
		}
	});

	return (
		<primitive
			object={CatModel.scene}
		/>
	);
}

useGLTF.preload('./model/RoroRoomCat.glb');