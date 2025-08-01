
import { InterviewClient } from './_components/interview-client';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Interview } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { mockInterviews } from '@/lib/mock-data';


async function getInterviewData(id: string): Promise<Interview | null> {
    // For the interview page, we can start with mock data,
    // as the transcript will be created and saved during the session.
    const interview = mockInterviews.find(i => i.id === id);
    if (interview) {
        // We can check if a transcript already exists in Firestore for this ID
        // and attach it if needed, but for starting a new interview, mock is sufficient.
        try {
            const interviewDoc = await getDoc(doc(db, 'axelaiDatabase', id));
            if (interviewDoc.exists()) {
                return { id: interviewDoc.id, ...interviewDoc.data() } as Interview;
            }
        } catch (error) {
             console.error("Error fetching potential existing interview data:", error);
        }
        return interview;
    }
    return null;
}

export default async function InterviewPage({ params }: { params: { id: string } }) {
  const interview = await getInterviewData(params.id);

  if (!interview) {
    return (
        <div className="flex items-center justify-center h-full">
             <Alert variant="destructive" className="max-w-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Interview Not Found</AlertTitle>
                <AlertDescription>
                    We could not find the interview session you are looking for.
                </AlertDescription>
            </Alert>
        </div>
    )
  }

  return <InterviewClient interview={interview} />;
}
