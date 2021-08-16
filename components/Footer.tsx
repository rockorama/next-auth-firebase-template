import clsx from 'clsx'
import { Box, makeStyles } from '@material-ui/core'
import { SITE_DATA } from '../seo'
import { DRAWER_WIDTH } from './Menu'

export default function Footer({ menu }: { menu: boolean }) {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.content, {
        [classes.contentShift]: menu,
      })}
      px={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      minHeight={{ xs: 95, sm: 85 }}
    >
      <Box>
        <Box>
          <strong>{SITE_DATA.title}</strong> - {SITE_DATA.description}
        </Box>
        <Box fontSize={10}>
          All rights reserved - {new Date().getFullYear()}.
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        fontSize={10}
      >
        Proudly built by
        <img src="/coddy-logo.png" width={80} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.grey[100],
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
}))
