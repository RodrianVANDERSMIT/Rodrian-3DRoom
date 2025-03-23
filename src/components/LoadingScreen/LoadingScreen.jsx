import { useState } from 'react';
import useStore from '../../stores/useStore';
import './LoadingScreen.css';

const translations = {
  fr: {
    welcome: "Bienvenue dans",
    welcome2: "mon salon 3D!",
    description: "Explorez la pièce en cliquant sur le menu de navigation ou sur les icônes disponibles pour vous rapprocher des différents éléments, comme le PC, la télé et bien plus encore. Cliquez sur le bouton du lecteur pour écouter de la musique et sur celui de la télécommande pour ajuster l'éclairage de la pièce.",
    goodExplore: "Bonne visite !",
    start: "Visiter",
    mobileWarning: "Si vous utilisez un téléphone, veuillez utiliser l'orientation paysage pour une meilleure expérience.",
    job: "Web Développeur"
  },
  en: {
    welcome: "Welcome to my 3D",
    welcome2: "living room !",
    description: "Explore the room by clicking on the navigation menu or the available icons to get closer to different elements, such as the PC, TV, and more. Click the music player button to listen to music, and use the remote control button to adjust the room's lighting.",
    goodExplore: "Enjoy your visit!",
    start: "Visit",
    mobileWarning: "If you're using a phone, please use landscape orientation for a better experience.",
    job: "Web Developer"
  }
};

const LoadingScreen = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(true);
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  const handleStart = () => {
    setIsVisible(false);
    onStart();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="presentation-window">
        <button
          onClick={toggleLanguage}
          className={`language-button ${language}`}
        >
          <span className={`language-en ${language === 'en' ? 'selected' : ''}`}>EN</span>
          <span className={`language-fr ${language === 'fr' ? 'selected' : ''}`}>FR</span>
        </button>

        <div className="profile-section">
          <img 
            src="https://media.licdn.com/dms/image/v2/D5603AQGM56rzPVrdFg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692715349772?e=1748476800&v=beta&t=JYtLmIP6WD2nAdN2zCwW1SGciNL-WNXwnK7bKUZ6x3o" 
            alt="Rodrian Van Der Smit" 
            className="profile-photo"
          />
          <h1>VAN DER SMIT</h1>
          <h2>RODRIAN</h2>
          <h3 className="job-title">{translations[language].job}</h3>
        </div>
        
        <div className="social-links">
          <a href="https://www.linkedin.com/in/rodrian-van-der-smit-297364252/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://rodrian-van-der-smit.vercel.app/" target="_blank" rel="noopener noreferrer">
            Portfolio 2D
          </a>
        </div>

        <div className="welcome-message">
          <h3>
            {translations[language].welcome}
            <br />
            {translations[language].welcome2}
          </h3>
          <p>
            {translations[language].description}
            <br /><br />
            {translations[language].goodExplore}
          </p>
        </div>

        <div className="buttons-container">
          <button className="start-button" onClick={handleStart}>
            {translations[language].start}
          </button>
        </div>

        <div className="mobile-warning">
          <p>{translations[language].mobileWarning}</p>
        </div>
      </div>
    </div>
  );
};


export default LoadingScreen; 