import { config } from 'dotenv';
config();

import '@/ai/flows/simulate-ai-interviewer.ts';
import '@/ai/flows/personalize-interview-questions.ts';
import '@/ai/flows/generate-interview-feedback.ts';