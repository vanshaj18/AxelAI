// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates feedback for a completed interview.
 *
 * - generateInterviewFeedback - A function that generates feedback for an interview.
 * - GenerateInterviewFeedbackInput - The input type for the generateInterviewFeedback function.
 * - GenerateInterviewFeedbackOutput - The return type for the generateInterviewFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInterviewFeedbackInputSchema = z.object({
  interviewTranscript: z
    .string()
    .describe('The transcript of the interview to generate feedback for.'),
  jobDescription: z.string().describe('The job description for the role.'),
});

export type GenerateInterviewFeedbackInput = z.infer<
  typeof GenerateInterviewFeedbackInputSchema
>;

const GenerateInterviewFeedbackOutputSchema = z.object({
  strengths: z.string().describe('The strengths of the candidate.'),
  weaknesses: z.string().describe('The weaknesses of the candidate.'),
  nextSteps: z
    .string()
    .describe('The next steps the candidate should take to improve.'),
});

export type GenerateInterviewFeedbackOutput = z.infer<
  typeof GenerateInterviewFeedbackOutputSchema
>;

export async function generateInterviewFeedback(
  input: GenerateInterviewFeedbackInput
): Promise<GenerateInterviewFeedbackOutput> {
  return generateInterviewFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewFeedbackPrompt',
  input: {schema: GenerateInterviewFeedbackInputSchema},
  output: {schema: GenerateInterviewFeedbackOutputSchema},
  prompt: `You are an AI-powered interview feedback generator.

  You will receive an interview transcript and a job description. You will use this information to generate feedback for the candidate.

  The feedback should include the candidate's strengths, weaknesses, and next steps they should take to improve.

  Interview Transcript: {{{interviewTranscript}}}
  Job Description: {{{jobDescription}}}`,
});

const generateInterviewFeedbackFlow = ai.defineFlow(
  {
    name: 'generateInterviewFeedbackFlow',
    inputSchema: GenerateInterviewFeedbackInputSchema,
    outputSchema: GenerateInterviewFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
