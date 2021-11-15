import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
  User,
} from '@firebase/auth'
import { ValidationFunction } from 'formact'

import { app } from './client'

export const auth = getAuth(app)

export const { currentUser: user } = auth

export type UserType = User

export async function sendVerificationLink() {
  await sendEmailVerification(user)
}

export async function signUp(name: string, email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(user, { displayName: name })
  await sendEmailVerification(user)
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function reAuthenticate(password: string) {
  const credential = EmailAuthProvider.credential(user.email, password)
  return reauthenticateWithCredential(user, credential)
}

export async function changePassword(password: string, newPassword: string) {
  await reAuthenticate(password)
  return updatePassword(user, newPassword)
}

export function sendResetPasswordLink(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export function resetPassword(oobCode: string, newPassword: string) {
  return confirmPasswordReset(auth, oobCode, newPassword)
}

export function verifyEmail(oobCode: string) {
  return applyActionCode(auth, oobCode)
}

export function updateName(displayName: string) {
  return updateProfile(user, { displayName })
}

export function updateAvatar(photoURL: string) {
  return updateProfile(user, { photoURL })
}

export function signOut() {
  return auth.signOut()
}

export const PASSWORD_VALIDATION: ValidationFunction = (
  value: string,
  values: Record<string, string>
) => {
  if (value && value !== values.newPassword) {
    return 'Passwords must match'
  }
}
