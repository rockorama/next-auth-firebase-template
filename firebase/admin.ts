import admin, { ServiceAccount } from 'firebase-admin'
import { NextApiRequest } from 'next'

import ENV from '../config/environment'

const FIREBASE_CONFIG = {
  TESTING: {
    type: '',
    project_id: '',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: '',
    token_uri: '',
    auth_provider_x509_cert_url: '',
    client_x509_cert_url: '',
  },
  PRODUCTION: {
    type: '',
    project_id: '',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: '',
    token_uri: '',
    auth_provider_x509_cert_url: '',
    client_x509_cert_url: '',
  },
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG[ENV] as ServiceAccount),
  })
}

export const db = admin.firestore()
export const auth = admin.auth()

export type UserRecord = admin.auth.UserRecord | null | undefined

export const getUserInfo = async (req: NextApiRequest): Promise<UserRecord> => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      const authToken = req.headers.authorization.split(' ')[1]
      const userInfo = await admin.auth().verifyIdToken(authToken)

      return await auth.getUser(userInfo.uid)
    } catch (e) {
      return null
    }
  }

  return null
}

export default admin
