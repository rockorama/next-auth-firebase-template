import { Avatar as ChakraAvatar } from '@chakra-ui/react'

import { useAuth } from '../utils/Contexts/Auth'

export default function Avatar(
  props: React.ComponentProps<typeof ChakraAvatar>
) {
  const { user } = useAuth()

  return (
    <ChakraAvatar
      name={user?.displayName}
      src={props.src || user?.photoURL}
      {...props}
    />
  )
}
