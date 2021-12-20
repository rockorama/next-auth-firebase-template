import { useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Form, { FormSubmitPayload } from 'formact'

import TextField from '../../components/Form/TextField'
import FormSubmitButton from '../../components/Form/FormSubmitButton'
import CenterContainer from '../../components/CenterContainer'
import Feedback from '../../components/Feedback'
import Link from '../../components/Link'

import {
  PASSWORD_VALIDATION,
  resetPassword,
} from '../../firebase/authentication'

type ResetPasswordForm = {
  newPassword: string
  repeatPassword: string
}

export default function ResetPassword() {
  const [done, setDone] = useState<FeedbackState>()
  const router = useRouter()

  const onSubmit = async (payload: FormSubmitPayload<ResetPasswordForm>) => {
    if (payload.valid) {
      try {
        await resetPassword(
          router.query.oobCode?.toString() || '',
          payload.values.newPassword
        )
        setDone({
          message: 'Your password was reset!',
          severity: 'success',
        })
      } catch (e) {
        setDone({ severity: 'error', message: e.message })
        payload.onFinish(true)
      }
    } else {
      payload.onFinish()
    }
  }

  if (done) {
    return (
      <CenterContainer>
        <Feedback {...done} />
        <Link pt={4} href="/login">
          Login to access your account
        </Link>
      </CenterContainer>
    )
  }

  return (
    <Form<ResetPasswordForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Heading size="md" mb={4}>
          Reset your password?
        </Heading>

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
