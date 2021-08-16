declare module 'formact'
declare module 'cors'
declare module 'react-file-picker'

type Child = JSX.Element | null
type Children = Child | Child[]

type FormSubmitPayload = {
  valid: boolean
  values: Record<string, any>
  errors: Record<string, any>
  onFinish: (clear?: boolean) => void
  setError: (field: string, message: string) => void
}

type FormChangePayload = {
  valid: boolean
  values: Record<string, any>
  errors: Record<string, any>
  action?: string
}

type PayloadField = {
  field: string
  value?: string
}

type ValidationFunction = (
  value: string,
  values: Record<string, any>
) => ?(string | null | undefined)
type Validation = ValidationFunction | Array<ValidationFunction>

type FormContextType = {
  errors: Record<string, any>
  values: Record<string, any>
  valid: boolean
  submitted: boolean
  submitting: boolean
  isDirty: (field: string) => boolean
  setDirty: (field: string) => any
  getValue: (field: string) => string
  updateValue: (field: string, value: string) => any
  updateValues: (fields: Array<PayloadField>) => any
  addField: (field: string, validation?: Validation) => any
  removeField: (field: string) => any
  submit: (mode?: any) => any
  clear: () => any
  setError: (field: string, message: string) => any
}

type UpdateAction = {
  type: 'UPDATE'
  payload: PayloadField | Array<PayloadField>
  onChange?: (payload: FormChangePayload) => any
}

type AddFieldAction = {
  type: 'ADD'
  payload: {
    field: string
    validation?: Validation
  }
  onChange?: (payload: FormChangePayload) => any
}

type RemoveFieldAction = {
  type: 'REMOVE'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type SetDirty = {
  type: 'SET_DIRTY'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type SetError = {
  type: 'SET_ERROR'
  payload: {
    field: string
    message?: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type ClearAction = {
  type: 'CLEAR'
  payload: {
    initialValue: Record<string, any>
  }
  onChange?: (payload: FormChangePayload) => any
}

type Action =
  | UpdateAction
  | AddFieldAction
  | RemoveFieldAction
  | ClearAction
  | SetDirty
  | SetError

type DefaultErrorMessages = {
  email?: string
  required?: string
}

type FieldProps = {
  name: string
  validation?: Validation
  required?: boolean
  type?: string
  onBlur?: (event: Record<string, any>) => any
  defaultErrorMessages?: DefaultErrorMessages
}

type FieldPayload = {
  fieldValue?: string
  update: (value: string) => any
  showError: boolean
  errorMessage?: string
  onBlur: (e?: Record<string, any>) => any
  submit: () => any
  submitting: boolean
  valid: boolean
}

type FormProps = {
  onSubmit?: (payload: FormSubmitPayload, mode?: string) => any
  onChange?: (payload: FormChangePayload) => any
  initialValues?: Record<string, any>
  children: Children | ((payload: FormContextType) => Children)
}

type FeedbackState = {
  message: string
  severity: 'success' | 'error'
} | null
