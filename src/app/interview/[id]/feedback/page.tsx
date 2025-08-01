
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FeedbackClient } from './_components/feedback-client';
import { notFound } from 'next/navigation';
import type { Interview } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

async function getInterviewData(id: string): Promise<{ interview: Interview | null, transcript: string | null }> {
    try {
        const interviewDoc = await getDoc(doc(db, 'axelaiDatabase', id));
        if (interviewDoc.exists()) {
            const interview = { id: interviewDoc.id, ...interviewDoc.data() } as Interview;
            
            // If a transcript path exists, read it from the local file system
            if (interview.transcript && interview.transcript.endsWith('.txt')) {
                 try {
                    const transcriptContent = await fs.readFile(interview.transcript, 'utf8');
                    return { interview, transcript: transcriptContent };
                } catch (readError) {
                    console.error("Error reading transcript file:", readError);
                    // Set transcript to an error message or null if file not found
                    return { interview, transcript: "Error: Could not read transcript file." };
                }
            }
             // Fallback for interviews that might still have the transcript in the DB (legacy)
            return { interview, transcript: interview.transcript || null };
        }
        return { interview: null, transcript: null };
    } catch (error) {
        console.error("Error fetching interview data:", error);
        return { interview: null, transcript: null };
    }
}

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const { interview, transcript } = await getInterviewData(params.id);

  if (!interview) {
    notFound();
  }

  if (!transcript) {
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

  return <FeedbackClient interview={interview} transcript={transcript} />;
}
