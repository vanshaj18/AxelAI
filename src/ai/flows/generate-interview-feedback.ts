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
    .describe('The full transcript of the interview to generate feedback for.'),
  jobDescription: z.string().describe('The job description for the role.'),
});

export type GenerateInterviewFeedbackInput = z.infer<
  typeof GenerateInterviewFeedbackInputSchema
>;

const GenerateInterviewFeedbackOutputSchema = z.object({
  strengths: z.string().describe("The candidate's key strengths, with examples from the transcript."),
  weaknesses: z.string().describe("The candidate's key weaknesses or areas for improvement, with examples."),
  nextSteps: z
    .string()
    .describe('Actionable next steps and specific training areas the candidate should focus on to improve.'),
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
  prompt: `
  You are an expert AI career coach, providing detailed feedback to a job candidate after a practice interview.

  You will be given the full transcript of a technical interview and the original job description. Your task is to provide a comprehensive, fair, and constructive evaluation.

  Please analyze the transcript in the context of the job description and generate the following:

  1.  **Strengths**: Identify specific moments where the candidate performed well. Quote or reference parts of their answers. What concepts did they grasp correctly? Where was their communication clear?
  2.  **Weaknesses**: Identify specific areas where the candidate struggled. Pinpoint any technical inaccuracies, logical errors, or communication issues. Be direct but professional.
  3.  **Next Steps**: Based on their weaknesses, suggest a clear, actionable plan for improvement. Recommend specific topics to study, skills to practice (e.g., "Practice writing SQL JOINs with multiple conditions," or "Review Excel's VLOOKUP vs. INDEX/MATCH functions"), or resources to consult.

  Here is the data:
  - **Job Description**: {{{jobDescription}}}
  - **Interview Transcript**: {{{interviewTranscript}}}
  `,
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
