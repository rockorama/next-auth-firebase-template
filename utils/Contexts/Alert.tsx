import { useContext, useState, createContext, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

const AlertContext = createContext<{
  alert: (item: FeedbackState) => void
}>({
  alert: () => {},
})

export function useAlert() {
  const { alert } = useContext(AlertContext)
  return alert
}

export default function AlertProvider(props: { children: Children }) {
  const toast = useToast()

  const alert = useCallback((item?: FeedbackState | Error | string | null) => {
    if (!item) {
      toast.closeAll()
      return
    }

    if (typeof item === 'string') {
      toast({ title: item, status: 'success', isClosable: true })
      return
    }

    if (item instanceof Error) {
      toast({
        title: item.message?.replace('Firebase:', ''),
        status: 'error',
        isClosable: true,
      })
      return
    }

    toast({ title: item.message, isClosable: true, status: item.severity })
  }, [])

  return (
    <AlertContext.Provider value={{ alert }}>
      {props.children}
    </AlertContext.Provider>
  )
}
