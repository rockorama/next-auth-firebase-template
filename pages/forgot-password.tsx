import { useState } from 'react'
import Form from 'formact'
import { Box, Button, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'
import FeedbackBox from '../components/Feedback'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { auth } from '../firebase'

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
        <FeedbackBox
          message="We sent you an email with a link to reset your password."
          severity="success"
        />
      </CenterContainer>
    )
  }

  const onSubmit = async (payload: FormSubmitPayload) => {
    alert(null)
    if (payload.valid) {
      try {
        await auth.sendPasswordResetEmail(payload.values.email)
        setSuccess(true)
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form onSubmit={onSubmit}>
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
