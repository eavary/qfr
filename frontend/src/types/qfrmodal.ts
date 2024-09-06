
export interface QFRModalProps {
  confirmText: string
  cancelText: string
  title: string
  onModalClose: () => void
  onConfirmed: (event: any) => void
}

// Define a type for the QFRModal ref to establish links to the useImperativeHandle methods
export interface QFRModalRef {
  open: () => void
  close: () => void
}
