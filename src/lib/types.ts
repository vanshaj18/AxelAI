export type InterviewStatus = 'Active' | 'Upcoming' | 'Past';

export interface Interview {
  id: string;
  role: string;
  company?: string;
  date: string;
  status: InterviewStatus;
  jobDescription: string;
  candidateResume: string;
}

export type MessageRole = 'assistant' | 'user';

export interface Message {
    role: MessageRole;
    content: string;
    feedback?: string;
    question?: string;
}
