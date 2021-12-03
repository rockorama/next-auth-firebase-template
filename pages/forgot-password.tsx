import { useState } from 'react'
import Form, { FormSubmitPayload } from 'formact'
import { Box, Typography } from '@material-ui/core'
import { Alert, AlertIcon } from '@chakra-ui/react'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { sendResetPasswordLink } from '../firebase/authentication'

type ForgotPasswordForm = { email: string }

export default function ForgotPassword() {
  const { ready } = useAuthentication()
  const [success, setSuccess] = useState<boolean>(false)
  const alert = useAlert()

  if (!ready) {
    return null
  }

  if (success) {
    return (
      <CenterContainer maxWidth="sm">
        <Alert status="success">
          <AlertIcon />
          We sent you an email with a link to reset your password.
        </Alert>
      </CenterContainer>
    )
  }

  const onSubmit = async (payload: FormSubmitPayload<ForgotPasswordForm>) => {
    alert(null)
    if (payload.valid) {
      try {
        await sendResetPasswordLink(payload.values.email)
        setSuccess(true)
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<ForgotPasswordForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Box pb={4}>
          <Typography variant="h4">Forgot your password?</Typography>
        </Box>
        <TextField required name="email" type="email" label="Email" />

        <FormSubmitButton
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabledInvalid
        >
          Send reset email
        </FormSubmitButton>
      </CenterContainer>
    </Form>
  )
}
