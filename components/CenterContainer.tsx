import { Container, VStack } from '@chakra-ui/react'

type Props = {
  children: Children
  maxWidth?: 'sm' | 'xs' | 'md' | 'lg' | 'xl'
}

export default function CenterContainer(props: Props) {
  return (
    <Container size={props.maxWidth}>
      <VStack py={5}>{props.children}</VStack>
    </Container>
  )
}
