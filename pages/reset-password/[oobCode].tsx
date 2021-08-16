import { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Form from 'formact'

import TextField from '../../components/TextField'
import FormSubmitButton from '../../components/FormSubmitButton'
import FeedbackBox from '../../components/Feedback'
import CenterContainer from '../../components/CenterContainer'

import { auth } from '../../firebase'

export const PASSWORD_VALIDATION = (
  value: string,
  values: Record<string, string>
) => {
  if (value && value !== values.password) {
    return 'Passwords must match'
  }
}

export default function ResetPassword() {
  const [done, setDone] = useState<FeedbackState>()
  const router = useRouter()

  const onSubmit = async (payload: FormSubmitPayload) => {
    if (payload.valid) {
      try {
        await auth.confirmPasswordReset(
          router.query.oobCode?.toString() || '',
          payload.values.password
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
    <Form onSubmit={onSubmit}>
      <CenterContainer maxWidth="sm">
        <Box pb={4}>
          <Typography variant="h4">Reset your password?</Typography>
        </Box>
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
