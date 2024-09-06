import { useEffect, useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/qfrmodal'
import type { Zone } from '../../types/zone'
import QFRModal from '../QFRModal'

interface IProps {
  zone: Zone
  onSubmitted: (zone: Zone) => void
}

const EditZoneButton = ({ zone, onSubmitted }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

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
      handleClose()
    }
  }

  const handleClose = () => {
    resetForm()
    modal.current?.close()
  }

  const handleOpen = () => {
    modal.current?.open()
  }

  return (
    <>
      <EditIcon ml={4} _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal
        ref={modal}
        title={`Edit ${zone.name}`}
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={processSubmit}
        onModalClose={handleClose}
      >
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
      </QFRModal>
    </>
  )
}

export default EditZoneButton
