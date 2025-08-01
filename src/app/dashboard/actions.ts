
'use server';

import { db } from '@/lib/firebase';
import type { Interview } from '@/lib/types';
import { collection, getDocs, query } from 'firebase/firestore';

export async function getInterviews(): Promise<{
  success: boolean;
  data?: Interview[];
  error?: string;
}> {
  try {
    const interviewsCollection = collection(
      db,
      'axelaiDatabase/codingNinjasTest/interviews'
    );
    const q = query(interviewsCollection);
    const querySnapshot = await getDocs(q);
    const interviews = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Interview)
    );
    return { success: true, data: interviews };
  } catch (error) {
    console.error('Error fetching interviews: ', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to fetch interviews: ${errorMessage}` };
  }
}
