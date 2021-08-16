import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { useAuth } from '../utils/Contexts/Auth'

export default function MenuButton() {
  const { menuOpen, setMenu, user } = useAuth()

  if (!user) return null

  return (
    <IconButton onClick={() => setMenu(!menuOpen)}>
      <MenuIcon />
    </IconButton>
  )
}
