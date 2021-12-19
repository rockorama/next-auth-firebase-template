import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FieldProps, useField } from 'formact'

type Props = FieldProps & {
  label?: string
  helperText?: string
}

export default function TextField(props: Props) {
  const field = useField<string>(props)
  console.log(field.showError, field.errorMessage)
  return (
    <FormControl isRequired={props.required} pb={2}>
      {props.label ? (
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      ) : null}
      <Input
        id={props.name}
        type={props.type}
        value={field.fieldValue || ''}
        onChange={(e) => {
          field.update(e.target.value)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          field.onBlur()
        }}
      />
      {field.showError || props.helperText ? (
        <FormHelperText textColor={field.showError ? 'error' : undefined}>
          {field.errorMessage || props.helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}
