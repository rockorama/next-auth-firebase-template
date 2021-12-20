import { Box, CircularProgress } from '@chakra-ui/react'

export default function Loader() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate />
    </Box>
  )
}
