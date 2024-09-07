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

import type { QFRModalProps } from '../types/QFRModalType'

const QFRModal = forwardRef(function QFRModal({ 
  title,
  confirmText, 
  cancelText, 
  onConfirmed,
  onModalClose, 
  children, 
}: PropsWithChildren<QFRModalProps>, ref: any) {
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
          <Button colorScheme="blue" mr={3} onClick={onModalClose}>{cancelText}</Button>
          <Button type="submit" onClick={onConfirmed}>{confirmText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    ,
    document.getElementById('modal-root') as HTMLElement
  )
})

export default QFRModal
