import React, { useEffect } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { FieldProps, useField } from 'formact'
import { useFilePicker } from 'use-file-picker'
import { ImageDims } from 'use-file-picker/dist/interfaces'

import { useAlert } from '../../utils/Contexts/Alert'

type Props = FieldProps &
  React.ComponentProps<typeof Image> & {
    maxFileSize?: number
    imageSizeRestrictions?: ImageDims
  }
export default function ImageField(props: Props) {
  const alert = useAlert()

  const field = useField<File | string>({ ...props })

  const [openFileSelector, { plainFiles, errors, clear }] = useFilePicker({
    accept: 'image/*',
    multiple: false,
    maxFileSize: props.maxFileSize || 50,
    imageSizeRestrictions: props.imageSizeRestrictions || {
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

  useEffect(() => {
    if (plainFiles.length) {
      field.update(plainFiles[0])
    }
  }, [plainFiles])

  const src = plainFiles.length
    ? URL.createObjectURL(plainFiles[0])
    : typeof field.fieldValue === 'string'
    ? field.fieldValue
    : undefined

  return (
    <Box
      cursor="pointer"
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
      <Image src={src} size="2xl" {...props} />
    </Box>
  )
}
