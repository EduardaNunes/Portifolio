import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AudioManagerProvider } from './context/AudioManagerContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioManagerProvider>
      <App />
    </AudioManagerProvider>
  </React.StrictMode>,
)
