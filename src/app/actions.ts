
'use server';

import { randomBytes } from 'crypto';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';

// Mock email sending function for POC
const sendLoginCodeEmail = (email: string, code: string) => {
  console.log(`
    ================================
    MOCK EMAIL
    To: ${email}
    Subject: Your Axel AI Login Code
    
    Your login code is: ${code}
    This code will expire in 15 minutes.
    ================================
  `);
};

export async function generateLoginCode(email: string) {
  try {
    const code = randomBytes(4).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    await addDoc(collection(db, 'tempCodes'), {
      email,
      code,
      createdAt: serverTimestamp(),
      expiresAt,
    });

    // Simulate sending email
    sendLoginCodeEmail(email, code);

    return { success: true };
  } catch (error) {
    console.error('Error generating login code:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to generate code: ${errorMessage}` };
  }
}

export async function verifyLoginCode(email: string, code: string) {
  try {
    const codesRef = collection(db, 'tempCodes');
    const q = query(
      codesRef,
      where('email', '==', email),
      where('code', '==', code.toUpperCase())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: 'Invalid code or email.' };
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    if (data.expiresAt.toDate() < new Date()) {
      return { success: false, error: 'Your code has expired. Please request a new one.' };
    }
    
    // Set a session cookie upon successful verification
    cookies().set('auth-session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    // Delete the code after use
    await deleteDoc(doc.ref);

    return { success: true };
  } catch (error) {
    console.error('Error verifying login code:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to verify code: ${errorMessage}` };
  }
}

export async function logout() {
  cookies().delete('auth-session');
}
