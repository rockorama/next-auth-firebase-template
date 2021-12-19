import Link from 'next/link'
import {
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Box,
} from '@chakra-ui/react'

import { useAuth } from '../../utils/Contexts/Auth'
import { signOut, UserType } from '../../firebase/authentication'
import Avatar from '../Avatar'

export default function UserMenu() {
  const { ready, user } = useAuth()

  if (!ready) return null

  if (!user) {
    return (
      <HStack>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </HStack>
    )
  }

  return <AuthenticatedUserMenu user={user} />
}

function AuthenticatedUserMenu(props: { user: UserType }) {
  return (
    <Menu isLazy>
      <MenuButton>
        <HStack>
          <Box display={{ base: 'none', md: 'block' }}>
            {props.user.displayName}
          </Box>
          <Avatar size="sm" />
        </HStack>
      </MenuButton>
      <MenuList>
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href="/change-password">
          <MenuItem>Change Password</MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  )

  // return (
  //   <Box display="flex" alignItems="center">
  //     <Box display={{ xs: 'none', sm: 'block' }}>
  //       <Button
  //         color="inherit"
  //         onClick={(event) => {
  //           setAnchorEl(event.currentTarget)
  //         }}
  //         endIcon={<Avatar />}
  //       >
  //         {props.user.displayName}
  //       </Button>
  //     </Box>
  //     <Box display={{ xs: 'block', sm: 'none' }}>
  //       <IconButton
  //         color="inherit"
  //         onClick={(event) => {
  //           setAnchorEl(event.currentTarget)
  //         }}
  //       >
  //         <Avatar />
  //       </IconButton>
  //     </Box>

  //     <Menu
  //       anchorEl={anchorEl}
  //       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       id={'user-menu'}
  //       keepMounted
  //       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       open={!!anchorEl}
  //       onClose={handleClose}
  //     >
  //       <Link href="/profile">
  //         <MenuItem onClick={handleClose}>Profile</MenuItem>
  //       </Link>
  //       <Link href="/change-password">
  //         <MenuItem onClick={handleClose}>Change password</MenuItem>
  //       </Link>
  //       <Divider />
  //       <MenuItem
  //         onClick={() => {
  //           handleClose()
  //           signOut()
  //         }}
  //       >
  //         Sign out
  //       </MenuItem>
  //     </Menu>
  //   </Box>
}
