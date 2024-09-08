import { Box } from '@chakra-ui/react'

import AnimatedOutlet from "./AnimatedOutlet";
import QFRBreadcrumb from '../components/QFRBreadcrumb'

import '../App.css'

const Layout = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <QFRBreadcrumb />
      <AnimatedOutlet />
    </Box>
  )
}

export default Layout
