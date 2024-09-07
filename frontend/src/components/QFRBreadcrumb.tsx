import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const QFRBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/devices'>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to='/schedule'>
          Schedule
        </BreadcrumbLink>
      </BreadcrumbItem>
      {/* <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Contact</BreadcrumbLink>
      </BreadcrumbItem> */}
    </Breadcrumb>
  )
}

export default QFRBreadcrumb
