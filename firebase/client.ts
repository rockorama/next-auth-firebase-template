import { initializeApp } from 'firebase/app'

import FIREBASE_CONFIG from '../firebaseClient.json'
import ENV from '../config/environment'

export const app = initializeApp(FIREBASE_CONFIG[ENV])
