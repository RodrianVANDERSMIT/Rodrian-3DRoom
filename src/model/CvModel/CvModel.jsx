import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function CvModel() {
	const cvModel = useGLTF('./model/RoroRoomCVPainting.glb')

	useEffect(() => {
		// Activer les ombres pour chaque objet de la scène
		cvModel.scene.traverse((node) => {
			if (node.isMesh) {
				node.castShadow = true;

			}
		});
	}, [cvModel]);

	return <primitive object={cvModel.scene} />;
}

useGLTF.preload('./model/RoroRoomCVPainting.glb');