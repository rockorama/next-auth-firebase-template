import Alert, { Color } from '@material-ui/lab/Alert'
import { Box } from '@material-ui/core'

const MESSAGES = {
  default: 'Oops, something went wrong!',
}

type Props = {
  message?: string | null | undefined
  messageId?: string | null | undefined
  clearError?: () => any
  severity?: Color
}

const FeedbackBox = (props: Props) => {
  return props.message || props.messageId ? (
    <Box>
      <Alert
        severity={props.severity || 'error'}
        onClose={
          props.clearError
            ? () => props.clearError && props.clearError()
            : undefined
        }
      >
        {props.messageId ? MESSAGES[props.messageId] || MESSAGES.default : null}
        {props.message}
      </Alert>
    </Box>
  ) : null
}

export default FeedbackBox
