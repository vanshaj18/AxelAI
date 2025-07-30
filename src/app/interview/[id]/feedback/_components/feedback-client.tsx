'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Interview } from '@/lib/types';
import { Download, AlertCircle, ThumbsUp, ThumbsDown, Forward } from 'lucide-react';
import { getFeedback } from '../actions';
import type { GenerateInterviewFeedbackOutput } from '@/ai/flows/generate-interview-feedback';
import Link from 'next/link';

export function FeedbackClient({
  interview,
  transcript,
}: {
  interview: Interview;
  transcript: string;
}) {
  const [feedback, setFeedback] = useState<GenerateInterviewFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getFeedback({
        interviewTranscript: transcript,
        jobDescription: interview.jobDescription,
      });

      if (result.success && result.data) {
        setFeedback(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
      setIsLoading(false);
    };

    fetchFeedback();
  }, [transcript, interview.jobDescription]);

  const FeedbackSection = ({ title, content, icon: Icon, variant }: { title: string; content: string | null; icon: React.ElementType; variant: 'success' | 'destructive' | 'default'}) => {
    const colorClass = {
        success: 'text-green-400',
        destructive: 'text-red-400',
        default: 'text-blue-400',
    }[variant];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Icon className={cn("h-6 w-6", colorClass)} />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
                )}
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Feedback Report</h1>
            <p className="text-muted-foreground">For your interview for the {interview.role} position.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
             <Link href="/" passHref>
                <Button>Back to Dashboard</Button>
            </Link>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackSection title="Strengths" content={feedback?.strengths ?? null} icon={ThumbsUp} variant="success" />
        <FeedbackSection title="Areas for Improvement" content={feedback?.weaknesses ?? null} icon={ThumbsDown} variant="destructive" />
      </div>
      <div>
        <FeedbackSection title="Suggested Next Steps" content={feedback?.nextSteps ?? null} icon={Forward} variant="default" />
      </div>
    </div>
  );
}
