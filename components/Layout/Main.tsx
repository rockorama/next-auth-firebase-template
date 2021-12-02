import { VStack, useToken } from '@chakra-ui/react'

import Footer from './Footer'
import { useHeaderHeight } from './Header'
export default function Main(props: ChildrenProps) {
  const headerHeight = useHeaderHeight()

  return (
    <VStack
      flex={1}
      as="main"
      minHeight={`calc( 100vh - ${headerHeight * 4}px)`}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {props.children}
      <Footer />
    </VStack>
  )
}
