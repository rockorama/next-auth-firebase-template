import NextLink from 'next/link'
import { Link as CKLink } from '@chakra-ui/react'

type Props = React.ComponentProps<typeof CKLink> & {
  href: string
  nextAs?: string
}

export default function Link(props: Props) {
  const { href, nextAs, ...other } = props
  return (
    <NextLink as={nextAs} href={href}>
      <CKLink {...other} />
    </NextLink>
  )
}
