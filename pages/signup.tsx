import { Heading } from '@chakra-ui/react'
import Form, { FormSubmitPayload } from 'formact'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'
import Link from '../components/Link'

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
        return
      } catch (e) {
        alert(e)
      }
    }
    payload.onFinish()
  }

  return (
    <Form<SignUpForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Heading size="md" pb={4}>
          Create your account
        </Heading>

        <TextField required name="name" label="Name" />
        <TextField required name="email" type="email" label="Email" />
        <TextField required name="password" type="password" label="Password" />
        <FormSubmitButton>Submit</FormSubmitButton>

        <Link href="/login" pt={4}>
          Already have an account?
        </Link>
      </CenterContainer>
    </Form>
  )
}
