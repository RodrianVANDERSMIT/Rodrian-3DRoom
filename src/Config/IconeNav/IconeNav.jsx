import React from 'react';
import { Html } from '@react-three/drei';
import { FaCamera } from 'react-icons/fa';
import useStore from '../../stores/useStore';

const Icon = ({ position, onClick, color }) => (
	<mesh position={position} onClick={onClick}>
		<sphereGeometry args={[0.15, 32, 32]} />
		<meshStandardMaterial color='blue' />
		<Html center>
			<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
				<FaCamera size={30} color="white" />
			</div>
		</Html>
	</mesh>
);

export default function IconeNav() {

	const cameraPositionPreset = useStore((state) => state.cameraPositionPreset);
	const setCameraPositionPreset = useStore((state) => state.setCameraPositionPreset);
	return (
		<>
			{cameraPositionPreset === 'Base' && (
				<>
					<Icon position={[2.4, 1, 1]} onClick={() => setCameraPositionPreset('TV')} />
					<Icon position={[-2.2, 1, -0.4]} onClick={() => setCameraPositionPreset('Desk')} />
					<Icon position={[-2.3, 2.4, -2.7]} onClick={() => setCameraPositionPreset('Painting Top Right')} />
					<Icon position={[-2.3, 1.8, -2.7]} onClick={() => setCameraPositionPreset('Painting Bot Right')} />
				</>
			)}
		</>
	);
}