import { useEffect, useState } from 'react'
import { 
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import type { Device } from '../../types/device'

interface ModalProps {
  device: Device
  onSubmitted: (device: Device) => void
}

const DeleteDeviceModal = ({ device, onSubmitted }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [name, setName] = useState('')
  const [ipAddress, setIPAddress] = useState('')
  const [hostname, setHostname] = useState('')

  const resetForm = () => {
    setName(device.name)
    setIPAddress(device.ip_address)
    setHostname(device.hostname)
  }

  useEffect(() => {
    setName(device.name)
    setIPAddress(device.ip_address)
    setHostname(device.hostname)
  }, [])
  

  const processSubmit = (event: any) => {    
    event.preventDefault()

    if (name.length > 0 && ipAddress.length > 0 && hostname.length > 0) {
      onSubmitted({
        id: device.id,
        name: name,
        ip_address: ipAddress,
        hostname: hostname
      })
      onClose()
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <EditIcon ml={4} _hover={{cursor: 'pointer'}} onClick={onOpen}></EditIcon>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {device.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="edit-device-form" onSubmit={processSubmit}>
              <FormControl my={2}>
                <FormLabel>Device Name</FormLabel>
                <Input 
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl my={2}>
                <FormLabel>Hostname</FormLabel>
                <Input 
                  placeholder="Hostname"                   
                  value={hostname}
                  onChange={e => setHostname(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl my={2}>
                <FormLabel>IP Address</FormLabel>
                <Input 
                  placeholder="IP Address"
                  value={ipAddress}
                  onChange={e => setIPAddress(e.currentTarget.value)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme='blue' mr={3} onClick={handleClose}>Cancel</Button>
            {/* <Button variant='ghost' onClick={() => onConfirmClicked(device.id)}>Submit</Button> */}
            <Button type="submit" form="edit-device-form">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteDeviceModal
