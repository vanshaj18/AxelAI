import { mockInterviews } from '@/lib/mock-data';
import { InterviewClient } from './_components/interview-client';
import { notFound } from 'next/navigation';

export default function InterviewPage({ params }: { params: { id: string } }) {
  const interview = mockInterviews.find((i) => i.id === params.id);

  if (!interview) {
    notFound();
  }

  return <InterviewClient interview={interview} />;
}
