// src/ai/flows/personalize-interview-questions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to personalize interview questions based on aggregated candidate performance data.
 *
 * - personalizeInterviewQuestions - A .
 * - PersonalizeInterviewQuestionsInput - The input type for the personalizeInterviewQuestions function.
 * - PersonalizeInterviewQuestionsOutput - The output type for the personalizeInterviewQuestions funcfunction that personalizes interview questionstion.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeInterviewQuestionsInputSchema = z.object({
  jobTitle: z.string().describe('The job title for which the interview questions are being generated.'),
  candidatePerformanceData: z.string().describe('Aggregated data on how candidates have performed on previous interview questions, including areas of common strength and weakness.'),
  currentQuestions: z.array(z.string()).describe('The current set of interview questions being used.'),
});
export type PersonalizeInterviewQuestionsInput = z.infer<typeof PersonalizeInterviewQuestionsInputSchema>;

const PersonalizeInterviewQuestionsOutputSchema = z.object({
  revisedQuestions: z.array(z.string()).describe('A revised set of interview questions, adapted based on the candidate performance data.'),
  rationale: z.string().describe('Explanation of what changes were made to questions and why.'),
});
export type PersonalizeInterviewQuestionsOutput = z.infer<typeof PersonalizeInterviewQuestionsOutputSchema>;


export async function personalizeInterviewQuestions(input: PersonalizeInterviewQuestionsInput): Promise<PersonalizeInterviewQuestionsOutput> {
  return personalizeInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeInterviewQuestionsPrompt',
  input: {
    schema: PersonalizeInterviewQuestionsInputSchema,
  },
  output: {
    schema: PersonalizeInterviewQuestionsOutputSchema,
  },
  prompt: `You are an expert talent acquisition specialist, skilled at crafting insightful and challenging interview questions.

  Based on aggregated candidate performance data, you will revise a set of existing interview questions for a specific job title. 
  Your goal is to improve the relevance and difficulty of the interview process, targeting areas where candidates commonly struggle 
  and highlighting areas that determine success in the role.

  Job Title: {{{jobTitle}}}

  Candidate Performance Data: {{{candidatePerformanceData}}}

  Current Questions:{{#each currentQuestions}}\n- {{{this}}}{{#unless @last}}\n{{/unless}}{{/each}}

  Revised Questions: Provide a revised set of interview questions, incorporating what you learned from the Candidate Performance Data.

  Rationale: In a short paragraph, explain the changes you made to the questions and why.`, // Ensure proper Handlebars syntax
});

const personalizeInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'personalizeInterviewQuestionsFlow',
    inputSchema: PersonalizeInterviewQuestionsInputSchema,
    outputSchema: PersonalizeInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
