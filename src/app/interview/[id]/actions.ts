
'use server';

import { simulateAiInterviewer, SimulateAiInterviewerInput } from "@/ai/flows/simulate-ai-interviewer";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { Message, Interview } from "@/lib/types";
import { promises as fs } from 'fs';
import path from 'path';

export async function handleUserResponse(input: SimulateAiInterviewerInput) {
    try {
        const output = await simulateAiInterviewer(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to get response from AI." };
    }
}


export async function saveInterviewTranscript(interview: Interview, messages: Message[]) {
    try {
        const transcript = messages.map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`).join('\n\n');
        
        // --- START: Local file saving logic ---
        const transcriptsDir = path.join(process.cwd(), 'transcripts');
        await fs.mkdir(transcriptsDir, { recursive: true });

        // A simple way to get a candidate name from the resume string for the filename.
        const candidateNameMatch = interview.candidateResume.match(/^(.*)/);
        const candidateName = candidateNameMatch ? candidateNameMatch[1].trim().replace(/\s+/g, '_') : 'Unknown_Candidate';

        const fileName = `${interview.id}_${candidateName}.txt`;
        const filePath = path.join(transcriptsDir, fileName);

        await fs.writeFile(filePath, transcript, 'utf8');
        // --- END: Local file saving logic ---

        return { success: true };
    } catch (error) {
        console.error("Error saving transcript: ", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, error: `Failed to save transcript: ${errorMessage}` };
    }
}
