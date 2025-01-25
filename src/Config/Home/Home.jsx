import './Home.css';
import useStore from '../../stores/useStore';


export default function Home() {
	const isLoaded = useStore((state) => state.isLoaded);
	const setShowApp3D = useStore((state) => state.setShowApp3D);

	return (
		<div className="home">
			<h1>Bonjour, bienvenue sur mon portfolio 3D</h1>
			<div className="spinner"></div>
			<button
				disabled={!isLoaded}
				onClick={() => setShowApp3D(true)}
			>
				{isLoaded ? 'Démarrer l\'expérience' : 'Chargement...'}
			</button>
		</div>
	);
}