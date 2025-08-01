
'use server';

import { simulateAiInterviewer, SimulateAiInterviewerInput } from "@/ai/flows/simulate-ai-interviewer";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { Message, Interview } from "@/lib/types";

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
        
        const interviewRef = doc(db, 'axelaiDatabase/codingNinjasTest/interviews', interview.id);

        const updatedInterview: Interview = {
            ...interview,
            transcript: transcript,
            status: 'Past'
        }

        await setDoc(interviewRef, updatedInterview);

        return { success: true };
    } catch (error) {
        console.error("Error saving transcript: ", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, error: `Failed to save transcript: ${errorMessage}` };
    }
}
