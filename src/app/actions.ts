
'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';

export async function login(email: string) {
  try {
    // For POC, we just set the cookie directly without verification
    cookies().set('auth-session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true };
  } catch (error) {
    console.error('Error during login:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to login: ${errorMessage}` };
  }
}

export async function logout() {
  cookies().delete('auth-session');
}
