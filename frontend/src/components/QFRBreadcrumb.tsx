import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const QFRBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/devices'>
          Back to Devices
        </BreadcrumbLink>
      </BreadcrumbItem>
      {/* <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/schedule'>
          Schedule
        </BreadcrumbLink>
      </BreadcrumbItem> */}
    </Breadcrumb>
  )
}

export default QFRBreadcrumb
