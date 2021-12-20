import React, { useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import FeedbackBox from '../../components/Feedback'
import Loader from '../../components/Loader'
import CenterContainer from '../../components/CenterContainer'

import {
  sendVerificationLink,
  verifyEmail,
} from '../../firebase/authentication'
import { useAuth } from '../../utils/Contexts/Auth'

export default function VerifyEmail() {
  const { query } = useRouter()
  const { user, ready, refreshUser } = useAuth()
  const [result, setResult] = useState<FeedbackState>()

  useEffect(() => {
    if (!ready) {
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
          setResult({ severity: 'error', message: 'Invalid verification code' })
        }
      }
      verify()
    }
  }, [query, ready])

  if (!result) {
    return <Loader />
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
                setResult({ severity: 'error', message: 'Error sending link' })
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
