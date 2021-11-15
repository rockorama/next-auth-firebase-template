import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import ENV from './environment'

const FIREBASE_CONFIG = {
  TESTING: {
    apiKey: 'key',
    authDomain: '___.firebaseapp.com',
    projectId: '___',
    storageBucket: '___.appspot.com',
    messagingSenderId: '',
    appId: '',
  },
  PRODUCTION: {
    apiKey: 'key',
    authDomain: '___.firebaseapp.com',
    projectId: '___',
    storageBucket: '___.appspot.com',
    messagingSenderId: '',
    appId: '',
  },
}

const app = initializeApp(FIREBASE_CONFIG[ENV])

export const db = getFirestore(app)

export const storage = getStorage(app)

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const ref = storage.ref().child(path)
  const snapshot = await ref.put(file)
  return await snapshot.ref.getDownloadURL()
}

export const uploadUserFile = async (
  file: File,
  folder: string
): Promise<string> => {
  const user = auth.currentUser
  const path = `${user.uid}/${folder}/${file.name}`
  return await uploadFile(file, path)
}
