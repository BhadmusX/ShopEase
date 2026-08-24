import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes'
import { CartProvider } from './context/cartProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>

    <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
)
