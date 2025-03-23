import { Html } from '@react-three/drei';
import { FaQuestionCircle } from 'react-icons/fa';
import useStore from '../../stores/useStore';

const Icon = ({ position, onClick, color }) => (
	<mesh position={position} onClick={onClick}>
		<sphereGeometry args={[0.10, 32, 32]} />
		<meshStandardMaterial color='green' />
		<Html center>
			<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
				<FaQuestionCircle size={30} color="white" />
			</div>
		</Html>
	</mesh>
);

export default function IconeAnimation() {
	const setAnimationTvLeft = useStore((state) => state.setAnimationTvLeft);
	const animationTvLeft = useStore((state) => state.animationTvLeft);
	const setAnimationTvRight = useStore((state) => state.setAnimationTvRight);
	const animationTvRight = useStore((state) => state.animationTvRight);
	const isLoading = useStore((state) => state.isLoading);

	if (isLoading) return null;

	return (
		<>
			{animationTvLeft === false && (
				<Icon position={[1.7, 0.5, -2.5]} onClick={() => setAnimationTvLeft(!animationTvLeft)} />
			)}
			{animationTvRight === false && (
				<Icon position={[2.95, 0.5, -2.5]} onClick={() => setAnimationTvRight(!animationTvRight)} />
			)}
		</>
	);
}