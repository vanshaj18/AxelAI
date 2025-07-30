import { mockInterviews } from '@/lib/mock-data';
import { FeedbackClient } from './_components/feedback-client';
import { notFound } from 'next/navigation';

// In a real app, you would fetch the interview transcript from your database.
// For this mock, we'll just pass the interview details.
const MOCK_TRANSCRIPT = `
Interviewer: Hello, I'm your AI interviewer from Axel AI. I'm here to help you practice for your upcoming interview. To start, can you please tell me a bit about yourself and your experience?

Candidate: Sure! I'm Jane Doe, a software engineer with 5 years of experience in front-end development, specializing in React.js and modern JavaScript frameworks. I'm passionate about building intuitive and performant user interfaces. In my last role at TechCorp, I led the development of a new customer-facing dashboard which improved user engagement by 20%.

Interviewer: That's great to hear. Can you describe a challenging technical problem you faced on that project and how you solved it?

Candidate: We had a major performance bottleneck in our data visualization components. I used React's profiler to identify the issue, which was excessive re-rendering. I solved it by implementing memoization with React.memo and useMemo, and by virtualizing our large lists with react-window. This cut down render times by more than 50%.
`;


export default function FeedbackPage({ params }: { params: { id: string } }) {
  const interview = mockInterviews.find((i) => i.id === params.id);

  if (!interview) {
    notFound();
  }

  return <FeedbackClient interview={interview} transcript={MOCK_TRANSCRIPT} />;
}
