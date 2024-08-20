import { useState, useRef, useEffect } from 'react'

import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import type { Device } from '../../types/device'

interface IProps {
  device: Device
}

export default function DeviceAddEdit({device}: IProps) {
 
  const name = useRef<HTMLInputElement | null>(null)
  const ip_address = useRef<HTMLInputElement | null>(null)
  const hostname = useRef<HTMLInputElement | null>(null)
  const num_zones = useRef<HTMLInputElement | null>(null)

  if (name.current && hostname.current && ip_address.current && num_zones.current) {
    name.current.value = device.name
    hostname.current.value = device.hostname
    ip_address.current.value = device.ip_address
    num_zones.current.value = device.num_zones as any
  }

  const addDevice = async () => {
    const enteredName = name.current?.value
    const enteredHostname = hostname.current?.value
    const enteredIPAddress = ip_address.current?.value
    const enteredNumZones = num_zones.current?.value

    console.log('enteredName', enteredName)
    console.log('enteredHostname', enteredHostname)
    console.log('enteredIPAddress', enteredIPAddress)
    console.log('enteredNumZones', enteredNumZones)
    
    // validate
    if (
      (enteredName && enteredName.trim().length > 0)
      && (enteredHostname && enteredHostname.trim().length > 0)
      && (enteredIPAddress && enteredIPAddress.trim().length > 0)
      && (enteredNumZones && Number(enteredNumZones) > 0)
    ) {
      console.log('form is valid')
    } else {
      console.log('invalid')
    }

    // try {
    //   const response = await axios.post(URL + "/devices", { data: inputValue })
    //   console.log(response.data)
    //   fetchData(); // Fetch data again after posting
    // } catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <>
      <Text color={'gray.500'} textAlign="left" my={6}>
        Add Device
      </Text>
      <Input ref={name} placeholder="Name" />
      <Input ref={hostname} placeholder="Hostname" />
      <Input ref={ip_address} placeholder="IP Address" />
      <Input ref={num_zones} placeholder="Number of Zones" />
      
      <Button colorScheme='teal' onClick={addDevice} my={6}>Submit</Button>
    </>
  )
}
