import './MobileOrientationLock.css';
import { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import useStore from '../../stores/useStore';

export default function MobileOrientationLock() {
	const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
	const isLoading = useStore((state) => state.isLoading);

	const checkOrientation = () => {
		setIsPortrait(window.innerHeight > window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', checkOrientation);
		window.addEventListener('load', checkOrientation);

		return () => {
			window.removeEventListener('resize', checkOrientation);
			window.removeEventListener('load', checkOrientation);
		};
	}, []);

	if (isLoading) return null;

	return (
		isPortrait && (
			<div id="orientation-lock" >
				<p>Veuillez tourner votre appareil en mode paysage pour continuer.</p>
				<FaMobileAlt size={60} className="phone-icon" />
			</div>
		)
	);
}