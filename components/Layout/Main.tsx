import clsx from 'clsx'
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'

import { useAuth } from '../../utils/Contexts/Auth'

import { DRAWER_WIDTH } from './Menu'
import Footer from './Footer'

export default function Menu(props: { children: Children }) {
  const classes = useStyles()
  const { user, menuOpen } = useAuth()
  const theme = useTheme()
  const large = useMediaQuery(theme.breakpoints.up('md'))

  const menu = menuOpen && user && large
  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: menu,
        })}
      >
        {props.children}
      </main>
      <Footer menu={menu} />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: 'calc(100vh - 150px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
}))
