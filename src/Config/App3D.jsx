import { Canvas } from '@react-three/fiber'
import Experience from '../Experience.jsx'
import CameraController from './CameraController.jsx'
import { Leva } from 'leva'
import Interface from './Interface/Interface.jsx'
import IconeNav from './IconeNav/IconeNav.jsx'
import IconeAnimation from './IconeAnimation/IconeAnimation.jsx'
import CoffeeCupThree from '../model/CoffeeCup/CofeeCupThree.jsx'


export default function App3D() {

	return (
		<>
			<Interface />

			<Leva hidden />

			<Canvas
				style={{ width: '100dvw', height: '100dvh' }}
				shadows
				camera={{
					fov: 40,
					near: 0.1,
					far: 2000,
					position: [50 * 6, 50 * 4, 50 * 8]
				}}
			>

				<CoffeeCupThree />
				<CameraController />
				<IconeNav />
				<IconeAnimation />
				<Experience />

			</Canvas>
		</>
	)
}