import { Box, Heading } from '@chakra-ui/react'
import { Outlet } from "react-router-dom"

import QFRBreadcrumb from '../components/QFRBreadcrumb'

import '../App.css'

const Layout = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <QFRBreadcrumb />
      <Outlet />
    </Box>
  )
}

export default Layout
