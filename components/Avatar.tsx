import { Avatar as MuiAvatar, makeStyles } from '@material-ui/core'

import { useAuth } from '../utils/Contexts/Auth'

export default function Avatar(props: {
  src?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const classes = useStyles()
  const { user } = useAuth()

  return (
    <MuiAvatar
      alt={user?.displayName}
      src={props.src || user?.photoURL}
      className={classes[props.size || 'small']}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}))
