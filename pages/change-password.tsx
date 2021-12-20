import Form, { FormSubmitPayload } from 'formact'
import { Box, Heading } from '@chakra-ui/react'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { changePassword, PASSWORD_VALIDATION } from '../firebase/authentication'

type ChangePasswordForm = {
  password: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePassword() {
  const { ready, user } = useAuthentication(true)
  const alert = useAlert()

  if (!ready || !user) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload<ChangePasswordForm>) => {
    if (payload.valid) {
      alert(null)
      try {
        await changePassword(
          payload.values.password,
          payload.values.newPassword
        )
        alert({ severity: 'success', message: 'Password Successully Changed' })
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<ChangePasswordForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Box pb={4}>
          <Heading size="md">Change Password</Heading>
        </Box>

        <TextField
          type="password"
          required
          name="password"
          label="Current password"
        />
        <TextField
          type="password"
          required
          name="newPassword"
          label="New password"
        />
        <TextField
          validation={PASSWORD_VALIDATION}
          type="password"
          required
          name="repeatPassword"
          label="Repeat new password"
        />

        <FormSubmitButton>Submit</FormSubmitButton>
      </CenterContainer>
    </Form>
  )
}
