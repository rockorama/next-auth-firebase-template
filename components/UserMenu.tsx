import Link from 'next/link'

import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'

import { useAuth } from '../utils/Contexts/Auth'
import { auth, UserType } from '../firebase'
import { useState } from 'react'
import Avatar from './Avatar'

export default function UserMenu() {
  const { ready, user } = useAuth()

  if (!ready) return null

  if (!user) {
    return (
      <Box>
        <Link href="/login">
          <Button color="inherit" disableElevation>
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button disableElevation variant="contained" color="secondary">
            Sign Up
          </Button>
        </Link>
      </Box>
    )
  }
  return <AuthenticatedUserMenu user={user} />
}

function AuthenticatedUserMenu(props: { user: UserType }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = () => setAnchorEl(null)
  return (
    <Box display="flex" alignItems="center">
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Button
          color="inherit"
          onClick={(event) => {
            setAnchorEl(event.currentTarget)
          }}
          endIcon={<Avatar />}
        >
          {props.user.displayName}
        </Button>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <IconButton
          color="inherit"
          onClick={(event) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <Avatar />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={'user-menu'}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <Link href="/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href="/change-password">
          <MenuItem onClick={handleClose}>Change password</MenuItem>
        </Link>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose()
            auth.signOut()
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  )
}
