import { initializeApp } from 'firebase/app'

import ENV from '../environment'

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

export const app = initializeApp(FIREBASE_CONFIG[ENV])
