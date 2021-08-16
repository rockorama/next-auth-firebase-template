import { useEffect } from 'react'
import Form from 'formact'
import { Box, Button, Typography } from '@material-ui/core'
import { useFilePicker } from 'use-file-picker'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/FormSubmitButton'
import TextField from '../components/TextField'
import { auth, uploadUserFile } from '../firebase'
import { useAuthentication } from '../utils/Contexts/Auth'
import Avatar from '../components/Avatar'

import { useAlert } from '../utils/Contexts/Alert'

export default function Profile() {
  const { ready, user } = useAuthentication(true)
  const alert = useAlert()

  const [openFileSelector, { plainFiles, errors, clear }] = useFilePicker({
    accept: 'image/*',
    multiple: false,
    maxFileSize: 50,
    imageSizeRestrictions: {
      maxHeight: 1600,
      maxWidth: 1600,
      minHeight: 50,
      minWidth: 50,
    },
  })

  useEffect(() => {
    errors.length &&
      alert({ severity: 'error', message: 'Error to upload file' })
  }, [errors])

  if (!ready || !user) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload) => {
    if (payload.valid) {
      try {
        await auth.currentUser.updateProfile({
          displayName: payload.values.name,
        })
        if (plainFiles.length) {
          const fileUrl = await uploadUserFile(plainFiles[0], 'profile')
          await user.updateProfile({
            photoURL: fileUrl,
          })
          user.reload()
          clear()
        }
        alert({ severity: 'success', message: 'Profile updated!' })
      } catch (e) {
        alert({ severity: 'error', message: e.message })
      }
    }
    payload.onFinish()
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: user.displayName,
        email: user.email,
      }}
    >
      <CenterContainer maxWidth="sm">
        <Box pb={2}>
          <Typography variant="h4">Your Profile</Typography>
        </Box>
        <Box
          py={3}
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          onClick={() => {
            clear()
            openFileSelector()
          }}
        >
          <Avatar
            src={
              plainFiles.length ? URL.createObjectURL(plainFiles[0]) : undefined
            }
            size="large"
          />
          <Box py={1}>
            <Button>Change Avatar</Button>
          </Box>
        </Box>
        <TextField required name="name" label="Name" />
        <TextField disabled required name="email" type="email" label="Email" />

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
