declare module 'cors'
declare module 'react-file-picker'

type Child = JSX.Element | null
type Children = Child | Child[]

type ChildrenProps = {
  children: Children
}

type FeedbackState = {
  title?: string
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
} | null
