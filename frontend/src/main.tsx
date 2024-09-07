import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Layout from './routes/Layout'
import Devices from './routes/Devices.tsx'
import Home from './routes/Home.tsx'
import NotFound from './routes/NotFound.tsx'
import Schedule from './routes/Schedule.tsx'
import Zones from './routes/Zones.tsx'
import Mqtt from './routes/Mqtt.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/devices",
        element: <Devices />,
      },
      {
        path: "/devices/:deviceId",
        element: <Zones />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/mqtt",
        element: <Mqtt />,
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
