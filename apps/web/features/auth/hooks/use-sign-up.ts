'use client'

import { useMutation } from '@tanstack/react-query'
import { supabase } from 'lib/supabase.client'
import type { SignUpSchema } from '../schemas/sign-up'

export const useSignUp = () => {
  return useMutation(async (credentials: SignUpSchema) => {
    const { error } = await supabase.auth.signUp(credentials)

    if (error) {
      return Promise.reject(error.message)
    }

    return Promise.resolve('Successfully signed up')
  })
}
