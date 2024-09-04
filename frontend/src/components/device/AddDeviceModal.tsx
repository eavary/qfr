import { useState } from 'react'
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
import { AddIcon } from '@chakra-ui/icons'
import type { Device } from '../../types/device'

interface ModalProps {
  onSubmitted: (device: Device) => void
}

const AddDeviceModal = ({ onSubmitted }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [name, setName] = useState('')
  const [ipAddress, setIPAddress] = useState('')
  const [hostname, setHostname] = useState('')

  const resetForm = () => {
    setName('')
    setIPAddress('')
    setHostname('')
  }

  const processSubmit = (event: any) => {    
    event.preventDefault()

    if (name.length > 0 && ipAddress.length > 0 && hostname.length > 0) {
      onSubmitted({
        name: name,
        ip_address: ipAddress,
        hostname: hostname
      })
      handleClose()
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <AddIcon _hover={{cursor: 'pointer'}} onClick={onOpen}></AddIcon>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="add-device-form" onSubmit={processSubmit}>
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
            <Button type="submit" form="add-device-form">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddDeviceModal
