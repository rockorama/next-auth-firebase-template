import { useEffect } from 'react'
import {
  Divider,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Toolbar,
} from '@material-ui/core'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import { useAuth } from '../../utils/Contexts/Auth'

export default function Menu() {
  const classes = useStyles()
  const { user, ready, menuOpen, setMenu } = useAuth()

  const theme = useTheme()
  const large = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    setMenu(large)
  }, [large])

  if (!ready || !user) {
    return null
  }

  return (
    <Drawer
      variant={large ? 'persistent' : undefined}
      onClose={() => setMenu(false)}
      anchor="left"
      className={classes.drawer}
      open={menuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))
