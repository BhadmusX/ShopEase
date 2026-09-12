import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/routes.jsx'
import { CartProvider } from './context/cartProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <CartProvider>

        <Toaster position='top-right'/>
         <RouterProvider router={router}/>

       </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
