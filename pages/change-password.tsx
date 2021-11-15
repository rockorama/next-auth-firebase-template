import Form, { FormSubmitPayload } from 'formact'
import { Box, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'

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
          <Typography variant="h4">Change Password</Typography>
        </Box>

        <TextField
          type="password"
          required
          name="password"
          variant="outlined"
          label="Current password"
          fullWidth
        />
        <TextField
          type="password"
          required
          name="newPassword"
          variant="outlined"
          label="New password"
          fullWidth
        />
        <TextField
          validation={PASSWORD_VALIDATION}
          type="password"
          required
          name="repeatPassword"
          variant="outlined"
          label="Repeat new password"
          fullWidth
        />

        <FormSubmitButton
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabledInvalid
        >
          Submit
        </FormSubmitButton>
      </CenterContainer>
    </Form>
  )
}
