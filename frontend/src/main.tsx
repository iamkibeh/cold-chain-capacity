import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.tsx'
import ErrorPage from './components/error-page.tsx'
import { FacilityProvider } from './context/FacilityContext.tsx'
import Dashboard from './routes/dashboard.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FacilityProvider>
      <RouterProvider router={router} />
    </FacilityProvider>
    {/* <App /> */}
  </StrictMode>
)
