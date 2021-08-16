import { Box, Container } from '@material-ui/core'

type Props = {
  children: Children
  maxWidth?: false | 'sm' | 'xs' | 'md' | 'lg' | 'xl'
}

export default function CenterContainer(props: Props) {
  return (
    <Container maxWidth={props.maxWidth}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={5}
      >
        {props.children}
      </Box>
    </Container>
  )
}
