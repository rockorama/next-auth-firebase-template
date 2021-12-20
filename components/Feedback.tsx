import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react'

export default function Feedback(props: FeedbackState) {
  return (
    <Alert status={props.severity}>
      <AlertIcon />
      <Box>
        <AlertTitle mr={2}>{props.title || props.message}</AlertTitle>
        {props.title ? (
          <AlertDescription>{props.message}</AlertDescription>
        ) : null}
      </Box>
    </Alert>
  )
}
