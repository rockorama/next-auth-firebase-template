import Link from 'next/link'
import Form from 'formact'
import { Box, Button, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'

import { auth } from '../firebase'
import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'

export default function SignUp() {
  const { ready } = useAuthentication()
  const alert = useAlert()
  if (!ready) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload) => {
    if (payload.valid) {
      alert(null)
      try {
        await auth.createUserWithEmailAndPassword(
          payload.values.email,
          payload.values.password
        )
        await auth.currentUser.updateProfile({
          displayName: payload.values.name,
        })
        auth.currentUser.sendEmailVerification()
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
          <Typography variant="h4">Create your account</Typography>
        </Box>

        <TextField required name="name" label="Name" />
        <TextField required name="email" type="email" label="Email" />
        <TextField required name="password" type="password" label="Password" />

        <FormSubmitButton
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabledInvalid
        >
          Submit
        </FormSubmitButton>
        <Box pt={4}>
          <Link href="/login">
            <Button>Already have an account?</Button>
          </Link>
        </Box>
      </CenterContainer>
    </Form>
  )
}
