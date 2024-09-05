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
import { Zone } from '../../types/zone'

interface ModalProps {
  zone: Zone
  onSubmitted: (zone: Zone) => void
}

const EditZoneModal = ({ zone, onSubmitted }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setName(zone.name)
    setDescription(zone.description)
  }

  useEffect(() => {
    setName(zone.name)
    setDescription(zone.description)
  }, [])
  

  const processSubmit = (event: any) => {    
    event.preventDefault()

    if (name.length > 0 && description.length) {
      onSubmitted({
        id: zone.id,
        device_id: zone.device_id,
        name: name,
        description: description
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
          <ModalHeader>Edit {zone.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="edit-zone-form" onSubmit={processSubmit}>
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
            <Button type="submit" form="edit-zone-form">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditZoneModal
