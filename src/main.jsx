import './main.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Suspense, useState } from 'react'
import { Loader } from '@react-three/drei';
import { Analytics } from "@vercel/analytics/react"
import useStore from './stores/useStore'

import App from './App.jsx'
import MobileOrientationLock from './Config/MobileOrientationLock/MobileOrientationLock.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Main() {
  const [showLoader, setShowLoader] = useState(false);
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const handleStart = () => {
    setIsLoading(false);
    setShowLoader(true);
  };

  return (
    <StrictMode>
      <Analytics />
      
        {isLoading && <LoadingScreen onStart={handleStart} />}
        <Suspense fallback={null}>
        <App />
        <MobileOrientationLock />
      </Suspense>
      {showLoader && <Loader />}
    </StrictMode>
  );
}

root.render(<Main />)