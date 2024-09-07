import { useRef, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import type { QFRModalRef } from '../../types/QFRModalType'
import type { Device } from '../../types/DeviceType'
import QFRModal from '../QFRModal'

interface IProps {
  onSubmitted: (device: Device) => void
}

const AddDeviceButton = ({ onSubmitted }: IProps) => {
  const modal = useRef<QFRModalRef>(null)

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
        title="Add Device"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirmed={processSubmit}
        onModalClose={handleClose}
      >
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
      </QFRModal>
    </>
  )
}

export default AddDeviceButton
