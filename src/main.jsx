import './main.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei';
import { Analytics } from "@vercel/analytics/react"


import App from './App.jsx'
import MobileOrientationLock from './Config/MobileOrientationLock/MobileOrientationLock.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <StrictMode>
    <Analytics />
    <Suspense fallback={null} >
      <App />
      <MobileOrientationLock />
    </Suspense>
    <Loader />
  </StrictMode>
)