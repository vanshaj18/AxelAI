'use server';

/**
 * @fileOverview Simulates an AI interviewer that asks structured questions and evaluates responses in real-time.
 *
 * - simulateAiInterviewer - A function that simulates an AI interviewer experience.
 * - SimulateAiInterviewerInput - The input type for the simulateAiInterviewer function.
 * - SimulateAiInterviewerOutput - The return type for the simulateAiInterviewer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateAiInterviewerInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for the role being interviewed for.'),
  candidateResume: z.string().describe('The candidate\'s resume.'),
  candidateResponse: z.string().describe('The candidate\'s response to the current question.'),
  currentQuestion: z.string().optional().describe('The current question being asked to the candidate.'),
  conversationHistory: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});
export type SimulateAiInterviewerInput = z.infer<typeof SimulateAiInterviewerInputSchema>;

const SimulateAiInterviewerOutputSchema = z.object({
  nextQuestion: z.string().describe('The next question to ask the candidate.'),
  feedback: z.string().describe('Real-time feedback on the candidate\'s response.'),
  isInterviewFinished: z.boolean().describe('Whether the interview is finished.'),
});
export type SimulateAiInterviewerOutput = z.infer<typeof SimulateAiInterviewerOutputSchema>;

export async function simulateAiInterviewer(input: SimulateAiInterviewerInput): Promise<SimulateAiInterviewerOutput> {
  return simulateAiInterviewerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateAiInterviewerPrompt',
  input: {schema: SimulateAiInterviewerInputSchema},
  output: {schema: SimulateAiInterviewerOutputSchema},
  prompt: `You are an AI-powered interviewer designed to simulate a real-world interview experience for candidates.

  Your goal is to ask structured questions, evaluate responses in real-time, and provide feedback based on the candidate's response. Remember to ask
  candidate a range of questions from technical (many), semi-technical (some) and behavioural (few). 

  Consider the following information:
  - Job Description: {{{jobDescription}}}
  - Candidate Resume: {{{candidateResume}}}
  - Current Question: {{{currentQuestion}}}
  - Candidate Response: {{{candidateResponse}}}
  - Conversation History: {{#if conversationHistory}}
    {{#each conversationHistory}}
      Question: {{{question}}}
      Answer: {{{answer}}}
    {{/each}}
    {{else}}
    No previous conversation history.
    {{/if}}

  Based on the candidate\'s response, provide:
  1.  A next question to continue the interview.  If the interview should be finished, indicate that.
  2.  Real-time feedback on the candidate\'s response, including strengths, weaknesses, and areas for improvement.
  3.  A boolean value indicating whether the interview is finished.

  Ensure that the questions are relevant to the job description and the candidate\'s resume. The feedback should be constructive and actionable.

  Follow the instructions carefully and format the output according to the SimulateAiInterviewerOutputSchema.
  Remember to set isInterviewFinished to true when all relevant questions have been asked and the interview should conclude.
`,
});

const simulateAiInterviewerFlow = ai.defineFlow(
  {
    name: 'simulateAiInterviewerFlow',
    inputSchema: SimulateAiInterviewerInputSchema,
    outputSchema: SimulateAiInterviewerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
