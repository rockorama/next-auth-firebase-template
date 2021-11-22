import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Box, Button, CircularProgress } from '@material-ui/core'
import FeedbackBox from '../../components/Feedback'
import CenterContainer from '../../components/CenterContainer'
import {
  sendVerificationLink,
  verifyEmail,
} from '../../firebase/authentication'
import { useAuth } from '../../utils/Contexts/Auth'

export default function VerifyEmail() {
  const { query, push } = useRouter()
  const { user, ready, refreshUser } = useAuth()
  const [result, setResult] = useState<FeedbackState>()

  useEffect(() => {
    if (!user) {
      return
    }
    if (query.oobCode) {
      const verify = async () => {
        try {
          await verifyEmail(query.oobCode?.toString() || '')
          await refreshUser()
          setResult({
            severity: 'success',
            message: 'Your email address is now verified.',
          })
        } catch (e) {
          setResult({ severity: 'error', message: e.message })
        }
      }
      verify()
    }
  }, [query, user])

  useEffect(() => {
    if (!user) {
      return
    }
    if (result?.severity === 'success') {
      const timeoutID = setTimeout(() => {
        push('/')
      }, 5000)

      return () => {
        timeoutID && clearTimeout(timeoutID)
      }
    }
  }, [result, user])

  if (!ready) {
    return null
  }

  if (!result) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    )
  }

  return (
    <CenterContainer>
      <FeedbackBox {...result} />
      {user && !user.emailVerified && result.severity === 'error' ? (
        <Box pt={4}>
          <Button
            onClick={async () => {
              try {
                await sendVerificationLink()
                setResult({
                  severity: 'success',
                  message:
                    'The email address verification link was sent to your inbox!',
                })
              } catch (e) {
                setResult({ severity: 'error', message: e.message })
              }
            }}
          >
            Send new link
          </Button>
        </Box>
      ) : null}
    </CenterContainer>
  )
}
