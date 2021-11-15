import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'

import UserMenu from './UserMenu'
import MenuButton from './MenuButton'

import { SITE_DATA } from '../../config/seo'

export default function Header() {
  const classes = useStyles()

  return (
    <>
      <Toolbar />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <MenuButton />
          <Link href="/">
            <Typography className={classes.logo} variant="h5">
              {SITE_DATA.title}
            </Typography>
          </Link>
          <Box flex={1}></Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    cursor: 'pointer',
  },
}))
