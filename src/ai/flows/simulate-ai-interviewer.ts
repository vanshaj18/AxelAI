
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
    feedback: z.string().optional(),
    score: z.number().optional(),
  })).optional().describe('The history of the conversation so far.'),
});
export type SimulateAiInterviewerInput = z.infer<typeof SimulateAiInterviewerInputSchema>;

const SimulateAiInterviewerOutputSchema = z.object({
  nextQuestion: z.string().describe('The next question to ask the candidate. If the interview is over, this should be a concluding remark.'),
  feedback: z.string().describe('Polite, professional, and real-time feedback on the candidate\'s last response. Identify syntax errors, logical flaws, or incomplete assumptions.'),
  score: z.number().min(0).max(10).describe('A score from 0 to 10 for the candidate\'s last response.'),
  evaluation: z.string().describe('A summary of the reasoning behind the feedback and score provided.'),
  isInterviewFinished: z.boolean().describe('Whether the interview should be considered finished.'),
  clarificationNeeded: z.boolean().describe('Whether the candidate should be given a chance to clarify a critical mistake.'),
});
export type SimulateAiInterviewerOutput = z.infer<typeof SimulateAiInterviewerOutputSchema>;

export async function simulateAiInterviewer(input: SimulateAiInterviewerInput): Promise<SimulateAiInterviewerOutput> {
  return simulateAiInterviewerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateAiInterviewerPrompt',
  input: {schema: SimulateAiInterviewerInputSchema},
  output: {schema: SimulateAiInterviewerOutputSchema},
  prompt: `You are a professional and rigorous technical interviewer, Axel for company called Coding Ninjas. 
  Your expertise is in SQL and Advanced Excel. Your goal is to conduct a structured technical interview based on the provided job description.

Interview Process:
1.  If this is the first turn, greet the candidate, introduce yourself, and explain that the interview will focus on SQL and Excel to assess their technical skills for the role. Then, ask your first question.
2.  For each subsequent turn, you will receive the candidate's response to your previous question.
3.  You MUST ask targeted technical questions based on the job description. Cover topics like code writing, syntax correction, function knowledge (e.g., VLOOKUP, INDEX/MATCH in Excel; JOINs, GROUP BY, window functions in SQL), and general software knowledge.
4.  You MUST evaluate the candidate's response in real-time and provide detailed, polite, and professional feedback.
    - Check for syntax errors, logical errors, and incomplete assumptions.
    - If a critical mistake is made (e.g., misunderstanding JOINs), flag it, set 'clarificationNeeded' to true, and ask the candidate to reconsider their answer. Only do this once per major error.
5.  Assign a score from 0 (completely incorrect) to 10 (perfect) for the candidate's response.
6.  Provide a concise 'evaluation' explaining your reasoning for the score and feedback.
7.  Based on their performance, decide on the next question. If the candidate consistently fails, you may decide to end the interview early by setting 'isInterviewFinished' to true.
8.  Continue this process for about 5-7 questions, covering a range of difficulties. After the last question, set 'isInterviewFinished' to true and provide a concluding remark as the 'nextQuestion'.

Candidate and Role Information:
- Job Description: {{{jobDescription}}}
- Candidate Resume: {{{candidateResume}}}

Conversation History (for context):
{{#if conversationHistory}}
  {{#each conversationHistory}}
    Question: {{{question}}}
    Answer: {{{answer}}}
    Feedback: {{{feedback}}}
    Score: {{{score}}}
  {{/each}}
{{else}}
  This is the beginning of the interview.
{{/if}}

Current Turn:
- Current Question: {{{currentQuestion}}}
- Candidate's Response: {{{candidateResponse}}}

Your Task:
Based on the candidate's response, generate your evaluation. Format your entire output as a single, valid JSON object that strictly follows the 'SimulateAiInterviewerOutputSchema'.
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
