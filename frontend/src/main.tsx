import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Layout from './layouts/Layout.tsx'

import Devices from './views/Devices.tsx'
import Home from './views/Home.tsx'
import NotFound from './views/NotFound.tsx'
import Schedule from './views/Schedule.tsx'
import Zones from './views/Zones.tsx'
import Mqtt from './views/Mqtt.tsx'

import './index.css'

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
        path: "/schedule/:deviceId",
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
