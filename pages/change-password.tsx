import Form from 'formact'
import { Box, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'

import { auth, reAuth } from '../firebase'
import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'

import { PASSWORD_VALIDATION } from './reset-password/[oobCode]'

export default function ChangePassword() {
  const { ready, user } = useAuthentication(true)
  const alert = useAlert()

  if (!ready || !user) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload) => {
    if (payload.valid) {
      alert(null)
      try {
        await reAuth(payload.values.currentPassword)
        await auth.currentUser.updatePassword(payload.values.password)
        alert({ severity: 'success', message: 'Password Successully Changed' })
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: user.displayName,
        email: user.email,
      }}
    >
      <CenterContainer maxWidth="sm">
        <Box pb={4}>
          <Typography variant="h4">Change Password</Typography>
        </Box>

        <TextField
          type="password"
          required
          name="currentPassword"
          variant="outlined"
          label="Current password"
          fullWidth
        />
        <TextField
          type="password"
          required
          name="password"
          variant="outlined"
          label="New password"
          fullWidth
        />
        <TextField
          validation={PASSWORD_VALIDATION}
          type="password"
          required
          name="repeat-password"
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
