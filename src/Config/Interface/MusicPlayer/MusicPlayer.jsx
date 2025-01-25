import './MusicPlayer.css';
import { useState, useRef, useEffect } from 'react';
import { FaVolumeMute, FaVolumeDown, FaVolumeUp, FaPlay, FaPause, FaStepForward, FaStepBackward, FaPlus, FaMinus, FaBars, FaTimes } from 'react-icons/fa';
import useStore from '../../../stores/useStore';

export default function MusicPlayer() {

  const language = useStore((state) => state.language);

  const translations = {
    en: {
      music: "Music",
      player: "Music Player",
      nowPlaying: "Now Playing:",
    },
    fr: {
      music: "Musique",
      player: "Lecteur de Musique",
      nowPlaying: "En cours de lecture :",
    },
  };

  const [songs] = useState([
    { title: "Better-day", src: "./music/better-day.mp3" },
    { title: "Sad-soul", src: "./music/sad-soul-chasing-a-feeling.mp3" },
  ]);


  const [currentSongIndex, setCurrentSongIndex] = useState(0); // État pour le morceau actuel, initialisé à 0
  // const [isPlaying, setIsPlaying] = useState(false); // État pour la lecture, initialisé à false
  const [isMuted, setIsMuted] = useState(false); // État pour le mutage, initialisé à false
  const [volume, setVolume] = useState(0.5); // État pour le volume, initialisé à 1 (plein volume)
  const [progress, setProgress] = useState(0); // État pour la progression de la piste
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu
  const audioRef = useRef(null); // Référence pour l'élément audio

  const { isPlaying, setIsPlaying } = useStore((state) => state);

  // Effet pour charger le morceau, initialiser le volume et jouer/pause le morceau
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume; // Initialiser le volume
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex,]);

  // Effet pour mettre à jour le volume de l'élément audio sans recharger le morceau
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Mettre à jour le volume actuel sur l'élément audio
    }
  }, [volume]);

  // Effet pour mettre à jour la progression de la piste en fonction du temps actuel et de la durée totale
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  // Gestionnaires pour play/pause le morceau
  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Gestionnaire pour passer au morceau suivant
  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  //gestionnaire pour passer au morceau précédent
  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  // Gestionnaire pour muter/démute l'audio
  const muteHandler = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
    if (!isMuted) {
      setVolume(0); // Mettre le volume à 0 si muté
    } else {
      setVolume(1.0); // Remettre le volume à 1 s'il n'est plus muté
    }
  };

  // Gestionnaires pour augmenter/diminuer le volume
  const volumeDownHandler = () => {
    const newVolume = Math.max(volume - 0.1, 0); // Réduire le volume par pas de 0.1, avec un minimum de 0
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0); // Mettre isMuted à true si le volume est à 0
    audioRef.current.muted = newVolume === 0; // Muter l'audio si le volume est à 0
  };

  // Augmenter le volume
  const volumeUpHandler = () => {
    const newVolume = Math.min(volume + 0.1, 1); // Augmenter le volume par pas de 0.1, avec un maximum de 1
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(false); // Démute l'audio lors de l'augmentation du volume
    audioRef.current.muted = false;
  };

  // Gestionnaire pour ouvrir/fermer le menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Gestionnaire pour cliquer sur la barre de progression et changer la position de lecture
  const handleProgressClick = (e) => {
    const clickPositionX = e.pageX - e.currentTarget.getBoundingClientRect().left;
    const progressBarWidth = e.currentTarget.offsetWidth;
    const clickPercentage = (clickPositionX / progressBarWidth);
    const newTime = clickPercentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className={`music-player ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? (
          <>
            <FaBars />
            <span>{translations[language].music}</span>
          </>
        ) : (
          <FaTimes />
        )}
      </div>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={nextSongHandler}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        autoPlay={isPlaying}
      ></audio>
      {!isMenuOpen && (
        <>
          <h2 className="title">{translations[language].player}</h2>
          <hr className="section-divider" />
          <div className="mute-button" onClick={muteHandler}>
            {isMuted ? <FaVolumeMute /> : (volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />)}
          </div>
          <div className="volume-control">
            <FaMinus className="volume-icon" onClick={volumeDownHandler} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <FaPlus className="volume-icon" onClick={volumeUpHandler} />
          </div>
          <hr className="section-divider" />
          <h3 className="current-song">{translations[language].nowPlaying} {songs[currentSongIndex].title}</h3>
          <div className="progress-bar-container" onClick={handleProgressClick}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="player-controls">
            <button onClick={prevSongHandler}><FaStepBackward /></button>
            <button onClick={playPauseHandler}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
            <button onClick={nextSongHandler}><FaStepForward /></button>
          </div>
        </>
      )}
    </div>
  );
}