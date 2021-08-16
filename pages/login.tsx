import Link from 'next/link'
import Form from 'formact'
import { Box, Button, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { auth } from '../firebase'

export default function Login() {
  const { ready } = useAuthentication()
  const alert = useAlert()

  if (!ready) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload) => {
    alert(null)
    if (payload.valid) {
      try {
        await auth.signInWithEmailAndPassword(
          payload.values.email,
          payload.values.password
        )
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
          <Typography variant="h4">Access your account</Typography>
        </Box>

        <TextField required name="email" type="email" label="Email" />
        <TextField required name="password" type="password" label="Password" />

        <FormSubmitButton
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabledInvalid
        >
          Login
        </FormSubmitButton>
        <Box pt={4} display>
          <Link href="/signup">
            <Button>Don't have an account?</Button>
          </Link>
        </Box>
        <Box pt={2} display>
          OR
        </Box>
        <Box pt={2} display>
          <Link href="/forgot-password">
            <Button>Forgot your Password?</Button>
          </Link>
        </Box>
      </CenterContainer>
    </Form>
  )
}
