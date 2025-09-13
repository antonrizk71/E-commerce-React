import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopContextProvider from './components/Context/ShopContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>

  </StrictMode>,
)
