
import { InterviewClient } from './_components/interview-client';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
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
