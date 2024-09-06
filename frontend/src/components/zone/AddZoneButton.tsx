import { useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/qfrmodal'
import type { Zone } from '../../types/zone'
import QFRModal from '../QFRModal'

interface IProps {
  deviceId: number,
  onSubmitted: (zone: Zone) => void
}

const AddZoneButton = ({ deviceId, onSubmitted }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

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
    modal.current?.close()
  }

  const handleOpen = () => {
    modal.current?.open()
  }

  return (
    <>
      <AddIcon _hover={{cursor: 'pointer'}} onClick={handleOpen} />

      <QFRModal 
        ref={modal}
        title="Add Zone"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={processSubmit}
        onModalClose={handleClose}
      >
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
        </QFRModal>
    </>
  )
}

export default AddZoneButton
