import { useState } from 'react'
import { Heading } from '@chakra-ui/react'
import Form, { FormSubmitPayload } from 'formact'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'
import Feedback from '../components/Feedback'

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
        <Feedback
          severity="success"
          title="Almost there!"
          message="We sent you an email with a link to reset your password."
        />
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
        <Heading size="md" mb={4}>
          Forgot your password?
        </Heading>
        <TextField required name="email" type="email" label="Email" />
        <FormSubmitButton>Send reset email</FormSubmitButton>
      </CenterContainer>
    </Form>
  )
}
