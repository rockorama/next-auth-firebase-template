declare module 'cors'
declare module 'react-file-picker'

type Child = JSX.Element | null
type Children = Child | Child[]

type FeedbackState = {
  message: string
  severity: 'success' | 'error'
} | null
