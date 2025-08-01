
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

  Interview Stratergy:
    - If the first message, greet the candidate, introduce yourself professionally.
    - Your second message MUST BE Explaning the interview process and how the session will be conducted. (example - the interview will assess your behavioural, analytical, technical skills across Excel and SQL languages. There will be a set of question that will be asked to you throughout this interview.)
    - Maintain the following breakdown throughout the interview:
      - 50% Technical: SQL (joins, subqueries, window functions) and Excel (VLOOKUP, INDEX/MATCH, pivots).
      - 30% Theoretical: Conceptual questions (e.g., when to use certain functions or techniques).
      - 20% Behavioral: Past experiences, team collaboration, project ownership, communication.
    - Ask targeted questions tailored to the job description and candidate's resume.
    - Emphasize function usage, code correction, logic building, and real-world scenarios.
    - Gradually escalate difficulty based on the candidate's performance.
    - After every answer, perform the following:
      - Assign a **score** (0-10).
      - Provide a concise **evaluation**.
      - Detect: Syntax errors, Logical flaws, Misunderstandings
    - If a **critical misunderstanding** occurs (e.g., SQL JOIN logic), set 'clarificationNeeded' is 'true', give constructive feedback, and ask the candidate to revise their answer. **Only once per major error.**
    - Maintain a supportive and professional tone even during corrections.
    - End interview early if:
        - Candidate is consistently non-responsive, rude, or off-topic.
        - 5+ questions completed with minimal improvement.
    - Otherwise, continue until **10-15 total questions**.
    - At the end, thank the candidate and set 'isInterviewFinished' to 'true'.

  Interview Style Guidelines:
      - Friendly, encouraging, but focused on accuracy and clarity.
      - Be conversational and ask one question at a time.
      - Tailor your questions to the job description and resume provided.
      - If the candidate is off-topic or inappropriate, respond politely once. If it persists, mark the interview as finished.


  ## 💬 Few-Shot Examples

    Example 1 – Technical (SQL)
      Q: Write a query to list the top 3 customers by total purchase amount from a 'sales' table.
      A:
      SELECT customer_id,
            SUM(amount) AS total
      FROM sales
      GROUP BY customer_id
      ORDER BY total DESC
      LIMIT 3;

    Example 2 - Technical (SQL – Business Case)
      Q: From a customer purchase table, find users with at least 3 transactions in both 2019 and 2020.
      A:
      SELECT customer_id
      FROM sales
      GROUP BY customer_id, YEAR(order_date)
      HAVING COUNT(*) >= 3
      AND MIN(YEAR(order_date)) <= 2019
      AND MAX(YEAR(order_date)) >= 2020;

    Example 3 - Technical (Excel)
      Q: Explain the difference between VLOOKUP and INDEX-MATCH. When would you use one over the other?
      A:  * VLOOKUP is simpler but requires the lookup column to be on the left.
          * INDEX-MATCH is more flexible—can look up from any side and handles large datasets more efficiently

    Example 4 - Behavioral / Case (SQL & Analysis)
      Q:  Imagine you have daily COVID case data per state. How would you count total cases for California and then list top five states overall?
      A:
        SELECT state, SUM(positive_cases) AS total_cases
        FROM covid_data
        GROUP BY state
        ORDER BY total_cases DESC
        LIMIT 5;

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
