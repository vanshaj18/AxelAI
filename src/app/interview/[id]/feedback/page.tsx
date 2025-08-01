
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FeedbackClient } from './_components/feedback-client';
import { notFound } from 'next/navigation';
import type { Interview } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

async function getInterviewData(id: string): Promise<Interview | null> {
    try {
        const interviewDoc = await getDoc(doc(db, 'axelaiDatabase/codingNinjasTest/interviews', id));
        if (interviewDoc.exists()) {
            return { id: interviewDoc.id, ...interviewDoc.data() } as Interview;
        }
        return null;
    } catch (error) {
        console.error("Error fetching interview data:", error);
        return null;
    }
}

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const interview = await getInterviewData(params.id);

  if (!interview) {
    notFound();
  }

  if (!interview.transcript) {
    return (
        <div className="flex items-center justify-center h-full">
             <Alert variant="destructive" className="max-w-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Transcript Not Found</AlertTitle>
                <AlertDescription>
                    We could not find a transcript for this interview session. Feedback cannot be generated.
                </AlertDescription>
            </Alert>
        </div>
    )
  }

  return <FeedbackClient interview={interview} transcript={interview.transcript} />;
}
