import React from 'react'
import { FieldProps, useField } from 'formact'

import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField'
import { Box } from '@material-ui/core'

export type TextFieldProps = FieldProps &
  MuiTextFieldProps & {
    noFormSubmit?: boolean
    disabled?: boolean
    error?: boolean
    multiline?: boolean
    onSubmit?: (value?: string) => any
  }

const TextField = (props: TextFieldProps) => {
  const {
    fieldValue,
    update,
    showError,
    errorMessage,
    submitting,
    onBlur,
    submit,
  } = useField<string>({
    ...props,
  })
  const { noFormSubmit, validation, ...other } = props

  const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    props.onKeyPress && props.onKeyPress(e)

    if (
      !props.multiline &&
      (e.nativeEvent.code === 'Enter' || e.nativeEvent.code === 'NumpadEnter')
    ) {
      e.preventDefault()
      !noFormSubmit && submit()
      props.onSubmit && props.onSubmit(fieldValue)
    }
  }

  return (
    <Box width="100%" pb={2}>
      <MuiTextField
        disabled={submitting || props.disabled}
        variant="outlined"
        fullWidth
        {...other}
        error={props.error || showError}
        helperText={
          showError ? errorMessage : props.helperText ? props.helperText : ''
        }
        value={fieldValue}
        onChange={(e) => {
          update(e.target.value)
          props.onChange && props.onChange(e)
        }}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
      />
    </Box>
  )
}

export default TextField
