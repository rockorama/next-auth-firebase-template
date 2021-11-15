import React from 'react'
import { useForm } from 'formact'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Box, Button, ButtonProps } from '@material-ui/core'

type Props = ButtonProps & {
  disabledInvalid?: boolean
}

const FormSubmitButton = (props: Props) => {
  const { valid, submit, submitting } = useForm()
  const { disabledInvalid, ...other } = props

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    submit()
    props.onClick && props.onClick(e)
  }

  return submitting ? (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <Button
      {...other}
      disabled={props.disabled || (!valid && disabledInvalid)}
      onClick={onSubmit}
    >
      {props.children}
    </Button>
  )
}

export default FormSubmitButton
