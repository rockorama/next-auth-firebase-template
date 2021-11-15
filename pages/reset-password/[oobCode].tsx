import { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Form, { FormSubmitPayload } from 'formact'

import TextField from '../../components/TextField'
import FormSubmitButton from '../../components/FormSubmitButton'
import FeedbackBox from '../../components/Feedback'
import CenterContainer from '../../components/CenterContainer'
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
        <FeedbackBox {...done} />
        <Box pt={4}>
          <Link href="/login">
            <Button>Login to access your account</Button>
          </Link>
        </Box>
      </CenterContainer>
    )
  }

  return (
    <Form<ResetPasswordForm> onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Box pb={4}>
          <Typography variant="h4">Reset your password?</Typography>
        </Box>
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
