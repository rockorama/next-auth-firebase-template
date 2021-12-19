import { VStack } from '@chakra-ui/react'

import Header from './Header'
import Main from './Main'

export default function Layout(props: ChildrenProps) {
  return (
    <VStack spacing={0} align="stretch">
      <Header />
      <Main>{props.children}</Main>
    </VStack>
  )
}
