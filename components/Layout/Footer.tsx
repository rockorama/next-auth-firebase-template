import { Box, HStack, Divider } from '@chakra-ui/react'
import { SITE_DATA } from '../../config/seo'

export default function Footer() {
  return (
    <Box w="100%">
      <Divider />
      <HStack
        p={4}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Box>
            <strong>{SITE_DATA.title}</strong> - {SITE_DATA.description}
          </Box>
          <Box fontSize={10}>
            All rights reserved - {new Date().getFullYear()}.
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          fontSize={10}
        >
          Proudly built by
          <img src="/coddy-logo.png" width={80} />
        </Box>
      </HStack>
    </Box>
  )
}
