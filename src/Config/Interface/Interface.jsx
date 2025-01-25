import './Interface.css';
import { useState } from 'react';
import useStore from '../../stores/useStore';

import LightController from './LightController/LightController.jsx';
import MusicPlayer from './MusicPlayer/MusicPlayer.jsx';




const translations = {
	en: {
		navigation: 'Navigation',
		livingRoom: 'Living Room',
		cat: 'Cat',
		desk: 'Desk',
		screenLeft: 'Screen Left',
		screenRight: 'Screen Right',
		painting: 'Painting',
		cv: 'Resume',
		tv: 'TV',
		zoom: 'Zoom',
		unzoom: 'UnZoom',
		linkToPortfolio: 'Link to my 2D portfolio',
		fullscreen: 'FullScreen',
		leaveFullscreen: 'Leave FullScreen',
	},
	fr: {
		navigation: 'Navigation',
		livingRoom: 'Salon',
		cat: 'Chat',
		desk: 'Bureau',
		screenLeft: 'Écran gauche',
		screenRight: 'Écran droite',
		painting: 'Tableau',
		cv: 'CV',
		tv: 'TV',
		zoom: 'Zoom',
		unzoom: 'UnZoom',
		linkToPortfolio: 'Lien vers mon portfolio 2D',
		fullscreen: 'Plein écran',
		leaveFullscreen: 'quitter plein écran',
	},
};

export default function Interface() {

	const cameraPositionPreset = useStore((state) => state.cameraPositionPreset);
	const setCameraPositionPreset = useStore((state) => state.setCameraPositionPreset);
	const language = useStore((state) => state.language);
	const setLanguage = useStore((state) => state.setLanguage);

	const texteLanguage = translations[language];

	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			// Si le plein écran n'est pas actif, entrer en mode plein écran
			const elem = document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { // Firefox
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { // IE/Edge
				elem.msRequestFullscreen();
			}
			setIsFullscreen(true);
		} else {
			// Si le plein écran est actif, sortir du mode plein écran
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) { // Firefox
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { // IE/Edge
				document.msExitFullscreen();
			}
			setIsFullscreen(false);
		}
	};

	const toggleLanguage = () => {
		if (language === 'en') {
			setLanguage('fr');
		} else {
			setLanguage('en');
		}
	};


	return (
		<>
			<div className="controller">
				<LightController />
				<MusicPlayer />
			</div>

			<div className="interface-container">
				<div className="menu">
					<h3 className="menu-title">Navigation</h3>
					<div className="menu-buttons">
						<button
							className={`nav-button ${cameraPositionPreset === 'Base' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Base')}
						>
							{texteLanguage.livingRoom}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'Cat' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Cat')}
						>
							{texteLanguage.cat}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'Desk' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Desk')}
						>
							{texteLanguage.desk}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'Screen Left' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Screen Left')}
						>
							{texteLanguage.screenLeft}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'Screen Right' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Screen Right')}
						>
							{texteLanguage.screenRight}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'Painting Top Right' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('Painting Top Right')}
						>
							{texteLanguage.painting}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'CvTop' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('CvTop')}
						>
							{texteLanguage.cv}
						</button>
						<button
							className={`nav-button ${cameraPositionPreset === 'TV' ? 'selected' : ''}`}
							onClick={() => setCameraPositionPreset('TV')}
						>
							{texteLanguage.tv}
						</button>
					</div>
				</div>
			</div>
			{cameraPositionPreset !== 'Base' && <button className="nav-button back-button" onClick={() => setCameraPositionPreset('Base')} > X</button>}

			{cameraPositionPreset === 'Desk' && <button className="nav-button zoom-button-right" onClick={() => setCameraPositionPreset('Screen Right')} >{texteLanguage.zoom}</button>}
			{cameraPositionPreset === 'Screen Right' && <button className="nav-button zoom-button-right zoom-back-right " onClick={() => setCameraPositionPreset('Desk')} >{texteLanguage.unzoom}</button>}

			{cameraPositionPreset === 'Desk' && <button className="nav-button zoom-button-left" onClick={() => setCameraPositionPreset('Screen Left')} >{texteLanguage.zoom}</button>}
			{cameraPositionPreset === 'Screen Left' && <button className="nav-button zoom-button-left zoom-back-left " onClick={() => setCameraPositionPreset('Desk')} >{texteLanguage.unzoom}</button>}

			<button className="nav-button link-button" onClick={() => window.open('https://rodrian-van-der-smit.vercel.app/', '_blank')} >{texteLanguage.linkToPortfolio}</button>

			{cameraPositionPreset === 'CvTop' && <button className="nav-button button-Cv-down " onClick={() => setCameraPositionPreset('CvBot')} >↓</button>}
			{cameraPositionPreset === 'CvBot' && <button className="nav-button button-Cv-up " onClick={() => setCameraPositionPreset('CvTop')} >↑</button>}

			{cameraPositionPreset === 'Painting Top Right' && <button className="nav-button button-Cv-down " onClick={() => setCameraPositionPreset('Painting Bot Right')} >↓</button>}
			{cameraPositionPreset === 'Painting Bot Right' && <button className="nav-button button-Cv-up " onClick={() => setCameraPositionPreset('Painting Top Right')} >↑</button>}

			<button
				onClick={toggleFullscreen}
				className='fullscreen-button'
			>
				{isFullscreen ? texteLanguage.leaveFullscreen : texteLanguage.fullscreen}
			</button>
			<button
				onClick={toggleLanguage}
				className={`language-button ${language}`}
			>
				<span className={`language-en ${language === 'en' ? 'selected' : ''}`}>EN</span>
				<span className={`language-fr ${language === 'fr' ? 'selected' : ''}`}>FR</span>
			</button>

		</>
	);
}