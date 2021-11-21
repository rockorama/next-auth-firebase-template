import Link from 'next/link'
import Form, { FormSubmitPayload } from 'formact'
import { Box, Button, Typography } from '@material-ui/core'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { signUp } from '../firebase/authentication'

type SignUpForm = {
  name: string
  email: string
  password: string
}

export default function SignUp() {
  const { ready } = useAuthentication()
  const alert = useAlert()
  if (!ready) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload<SignUpForm>) => {
    if (payload.valid) {
      alert(null)
      try {
        await signUp(payload.values)
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<SignUpForm> onSubmit={onSubmit}>
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
