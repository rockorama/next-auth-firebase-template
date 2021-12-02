import Link from 'next/link'
import { HStack, Button } from '@chakra-ui/react'

import { useAuth } from '../../utils/Contexts/Auth'
import { signOut, UserType } from '../../firebase/authentication'
import { useState } from 'react'
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

  return null
  // return <AuthenticatedUserMenu user={user} />
}

// function AuthenticatedUserMenu(props: { user: UserType }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const handleClose = () => setAnchorEl(null)
//   return (
//     <Box display="flex" alignItems="center">
//       <Box display={{ xs: 'none', sm: 'block' }}>
//         <Button
//           color="inherit"
//           onClick={(event) => {
//             setAnchorEl(event.currentTarget)
//           }}
//           endIcon={<Avatar />}
//         >
//           {props.user.displayName}
//         </Button>
//       </Box>
//       <Box display={{ xs: 'block', sm: 'none' }}>
//         <IconButton
//           color="inherit"
//           onClick={(event) => {
//             setAnchorEl(event.currentTarget)
//           }}
//         >
//           <Avatar />
//         </IconButton>
//       </Box>

//       <Menu
//         anchorEl={anchorEl}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         id={'user-menu'}
//         keepMounted
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         open={!!anchorEl}
//         onClose={handleClose}
//       >
//         <Link href="/profile">
//           <MenuItem onClick={handleClose}>Profile</MenuItem>
//         </Link>
//         <Link href="/change-password">
//           <MenuItem onClick={handleClose}>Change password</MenuItem>
//         </Link>
//         <Divider />
//         <MenuItem
//           onClick={() => {
//             handleClose()
//             signOut()
//           }}
//         >
//           Sign out
//         </MenuItem>
//       </Menu>
//     </Box>
//   )
// }
