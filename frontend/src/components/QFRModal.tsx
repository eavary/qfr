import { forwardRef, PropsWithChildren, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'

interface ModalProps {
  confirmText: string
  cancelText: string
  title: string
  onModalClose: () => void
  onConfirmed: (event: any) => void
}

const QFRModal = forwardRef(function QFRModal({ 
  cancelText, 
  children, 
  confirmText, 
  title, 
  onModalClose, 
  onConfirmed 
}: PropsWithChildren<ModalProps>, ref: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useImperativeHandle(ref, () => {
    return {
      open() {
        onOpen()
      },
      close() {
        onClose()
      }
    }
  })

  return createPortal(
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          {/* <Button colorScheme='blue' mr={3} onClick={handleClose}>Cancel</Button> */}
          <Button colorScheme='blue' mr={3} onClick={onModalClose}>{cancelText}</Button>
          {/* <Button type="submit" form="add-device-form">Submit</Button> */}
          <Button type="submit" onClick={onConfirmed}>{confirmText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    ,
    document.getElementById('modal-root') as HTMLElement
  )
})

export default QFRModal
