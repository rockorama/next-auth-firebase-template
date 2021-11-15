type Environment = 'PRODUCTION' | 'TESTING'

const ENV: Environment = (process.env.NEXT_PUBLIC_ENVIRONMENT ||
  'TESTING') as Environment

export const APP_SCHEME =
  ENV === 'TESTING' ? 'invoisr-testing://' : 'invoisr://'

export default ENV
