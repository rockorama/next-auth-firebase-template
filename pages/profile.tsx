import { Heading } from '@chakra-ui/react'
import Form, { FormSubmitPayload } from 'formact'

import CenterContainer from '../components/CenterContainer'
import FormSubmitButton from '../components/Form/FormSubmitButton'
import TextField from '../components/Form/TextField'
import ImageField from '../components/Form/ImageField'

import { useAuthentication } from '../utils/Contexts/Auth'
import { useAlert } from '../utils/Contexts/Alert'
import { updateAvatar, updateName } from '../firebase/authentication'
import { uploadUserFile } from '../firebase/storage'

type ProfileForm = {
  name: string
  email: string
  photoUrl?: File | string
}

export default function Profile() {
  const { ready, user, refreshUser } = useAuthentication(true)
  const alert = useAlert()

  if (!ready || !user) {
    return null
  }

  const onSubmit = async (payload: FormSubmitPayload<ProfileForm>) => {
    if (payload.valid) {
      try {
        await updateName(payload.values.name)

        if (payload.values.photoUrl) {
          let url = ''
          if (typeof payload.values.photoUrl === 'string') {
            url = payload.values.photoUrl
          } else {
            url = await uploadUserFile(payload.values.photoUrl, 'profile')
          }
          await updateAvatar(url)
          refreshUser()
        }

        alert({ severity: 'success', message: 'Profile updated!' })
      } catch (e) {
        alert({ severity: 'error', message: e.message })
      }
    }
    payload.onFinish()
  }

  return (
    <Form<ProfileForm>
      onSubmit={onSubmit}
      initialValues={{
        name: user.displayName,
        email: user.email,
        photoUrl: user?.photoURL,
      }}
    >
      <CenterContainer maxWidth="sm">
        <Heading size="md" pb={4}>
          Your Profile
        </Heading>

        <ImageField
          name="photoUrl"
          boxSize="300px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/300"
          borderRadius="full"
        />
        <TextField required name="name" label="Name" />
        <TextField readOnly required name="email" type="email" label="Email" />

        <FormSubmitButton>Submit</FormSubmitButton>
      </CenterContainer>
    </Form>
  )
}
