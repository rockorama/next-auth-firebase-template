import { GetServerSideProps } from 'next'

export default function AuthAction() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  let location: string
  switch (query?.mode) {
    case 'resetPassword': {
      location = `reset-password/${query.oobCode}`
      break
    }
    case 'verifyEmail': {
      location = `verify-email/${query.oobCode}`
      break
    }
    default: {
      location = '404'
      break
    }
  }

  res.statusCode = 302
  res.setHeader('Location', location)

  return { props: {} }
}
