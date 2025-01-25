import { useState } from 'react';
import './LightController.css';
import { FaRegLightbulb, FaLightbulb, FaTimes, FaBars, FaMinus, FaPlus } from 'react-icons/fa';
import { MdSunny } from 'react-icons/md';
import useStore from '../../../stores/useStore';

export default function LightController() {
	const { lightIntensity, setLightIntensity, toggleLight, setLightColor, lightColor } = useStore((state) => ({
		lightIntensity: state.lightIntensity,
		setLightIntensity: state.setLightIntensity,
		toggleLight: state.toggleLight,
		setLightColor: state.setLightColor,
		lightColor: state.lightColor
	}));

	const language = useStore((state) => state.language);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const text = language === 'en' ? 'Light' : 'Lumière';
	const controlText = language === 'en' ? 'Light Control' : 'Contrôle de la Lumière';

	return (

		<div className={`light-control ${isMenuOpen ? 'menu-open' : ''}`}>
			<div className="menu-toggle" onClick={toggleMenu}>
				{isMenuOpen ? (
					<>
						<FaBars />
						<span> {text} </span>
					</>
				) : (
					<FaTimes />
				)}
			</div>

			{!isMenuOpen && (
				<>
					<h2 className="title">{controlText}</h2>
					<hr className="section-divider" />
					<div className="light-button" onClick={toggleLight}>
						{lightIntensity === 0 ? <FaRegLightbulb /> : <FaLightbulb style={{ color: lightColor }} />}
					</div>
					<div className="light-intensity">
						<FaMinus
							className="light-icon"
							onClick={() => setLightIntensity(Math.max(lightIntensity - 10000, 0))}
						/>
						<input
							type="range"
							min="0"
							max="150000"
							step="5000"
							value={lightIntensity}
							onChange={(e) => setLightIntensity(parseInt(e.target.value))}
							className="light-slider"
						/>
						<FaPlus
							className="light-icon"
							onClick={() => setLightIntensity(Math.min(lightIntensity + 10000, 150000))}
						/>
					</div>
					<div className="light-color">
						<MdSunny
							style={{ color: 'white', fontSize: '30px', }}
							onClick={() => setLightColor('white')}
						/>

						<MdSunny
							style={{ color: 'red', fontSize: '30px', }}
							onClick={() => setLightColor('red')}
						/>
						<MdSunny
							style={{ color: 'green', fontSize: '30px' }}
							onClick={() => setLightColor('green')}
						/>
						<MdSunny
							style={{ color: 'blue', fontSize: '30px' }}
							onClick={() => setLightColor('blue')}
						/>
						<MdSunny
							style={{ color: 'yellow', fontSize: '30px' }}
							onClick={() => setLightColor('yellow')}
						/>
						<MdSunny
							style={{ color: 'purple', fontSize: '30px' }}
							onClick={() => setLightColor('purple')}
						/>
					</div>

				</>
			)}
		</div>
	);
}