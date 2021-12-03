import Link from 'next/link'
import {
  Box,
  Heading,
  Flex,
  useBreakpointValue,
  Divider,
  Button,
  useColorMode,
  useTheme,
} from '@chakra-ui/react'

import UserMenu from './UserMenu'

import { SITE_DATA } from '../../config/seo'

export function useHeaderHeight() {
  const height = useBreakpointValue({ base: 12, md: 16 })
  const { sizes } = useTheme()
  return sizes[height]
}

export default function Header() {
  const height = useHeaderHeight()
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <>
      <Box h={height} />
      <Box as="header" position="fixed" w="100%" margin={0} h={height}>
        <Flex
          px={4}
          w="100%"
          h={height}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/">
            <Heading size="lg">{SITE_DATA.title}</Heading>
          </Link>
          <Button onClick={toggleColorMode}>Toggle</Button>
          <UserMenu />
        </Flex>
        <Divider />
      </Box>
    </>
  )
}
