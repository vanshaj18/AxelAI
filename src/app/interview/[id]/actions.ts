
'use server';

import {
  generateInterviewFeedback,
  GenerateInterviewFeedbackInput,
} from '@/ai/flows/generate-interview-feedback';
import {
  simulateAiInterviewer,
  SimulateAiInterviewerInput,
} from '@/ai/flows/simulate-ai-interviewer';
import type { Interview, Message } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

export async function handleUserResponse(input: SimulateAiInterviewerInput) {
  try {
    const output = await simulateAiInterviewer(input);
    return { success: true, data: output };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get response from AI.' };
  }
}

export async function saveInterviewTranscript(
  interview: Interview,
  messages: Message[]
) {
  try {
    const transcript = messages
      .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
      .join('\n\n');

    // Generate feedback from the transcript
    const feedbackInput: GenerateInterviewFeedbackInput = {
      interviewTranscript: transcript,
      jobDescription: interview.jobDescription,
    };
    const feedbackOutput = await generateInterviewFeedback(feedbackInput);

    // Format the report
    const reportContent = `
Feedback Report for ${interview.role} Interview
=================================================
Candidate: ${interview.candidateResume.split('\n')[0]}
Date: ${new Date(interview.date).toLocaleDateString()}
Interview ID: ${interview.id}
-------------------------------------------------

### Strengths ###
${feedbackOutput.strengths}

-------------------------------------------------

### Areas for Improvement ###
${feedbackOutput.weaknesses}

-------------------------------------------------

### Suggested Next Steps ###
${feedbackOutput.nextSteps}

-------------------------------------------------
### Full Transcript ###
-------------------------------------------------
${transcript}
`;

    const transcriptsDir = path.join(process.cwd(), 'transcripts');
    await fs.mkdir(transcriptsDir, { recursive: true });

    const candidateNameMatch = interview.candidateResume.match(/^(.*)/);
    const candidateName = candidateNameMatch
      ? candidateNameMatch[1].trim().replace(/\s+/g, '_')
      : 'Unknown_Candidate';

    const fileName = `${interview.id}_${candidateName}_report.txt`;
    const filePath = path.join(transcriptsDir, fileName);

    await fs.writeFile(filePath, reportContent.trim(), 'utf8');

    return { success: true };
  } catch (error) {
    console.error('Error saving transcript: ', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      error: `Failed to save transcript: ${errorMessage}`,
    };
  }
}
