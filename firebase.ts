import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

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

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG[ENV])
}

export const db = firebase.firestore()
export const auth = firebase.auth()

export const reAuth = (password: string) => {
  const user = auth.currentUser
  if (user && user.email) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    )
    return user.reauthenticateWithCredential(credential)
  }
}

export type UserType = firebase.User

export const storage = firebase.storage()

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
