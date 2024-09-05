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
import { Zone } from '../../types/zone'

interface ModalProps {
  deviceId: number,
  onSubmitted: (zone: Zone) => void
}

const AddZoneModal = ({ deviceId, onSubmitted }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setName('')
    setDescription('')
  }

  const processSubmit = (event: any) => {    
    event.preventDefault()

    if (name.length > 0 && description.length > 0 && deviceId > 0) {
      onSubmitted({
        device_id: deviceId,
        name: name,
        description: description
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
          <ModalHeader>Add Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="add-zone-form" onSubmit={processSubmit}>
              <FormControl my={2}>
                <FormLabel>Zone Name</FormLabel>
                <Input 
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl my={2}>
                <FormLabel>Description</FormLabel>
                <Input 
                  placeholder="Description"                   
                  value={description}
                  onChange={e => setDescription(e.currentTarget.value)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme='blue' mr={3} onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="add-zone-form">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddZoneModal
