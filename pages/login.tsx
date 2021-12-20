import { Heading, VStack } from '@chakra-ui/react'
import Form, { FormSubmitPayload } from 'formact'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'
import Link from '../components/Link'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { login } from '../firebase/authentication'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const { ready } = useAuthentication()
  const alert = useAlert()

  if (!ready) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload<LoginForm>) => {
    alert(null)
    if (payload.valid) {
      try {
        await login(payload.values)
        return
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<LoginForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Heading size="md" mb={4}>
          Access your account
        </Heading>

        <TextField required name="email" type="email" label="Email" />
        <TextField required name="password" type="password" label="Password" />
        <FormSubmitButton>Login</FormSubmitButton>

        <VStack pt={4}>
          <Link href="/signup">Don't have an account?</Link>
          <span>or</span>
          <Link href="/forgot-password">Forgot your Password?</Link>
        </VStack>
      </CenterContainer>
    </Form>
  )
}
