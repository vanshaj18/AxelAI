
'use server';

import { simulateAiInterviewer, SimulateAiInterviewerInput } from "@/ai/flows/simulate-ai-interviewer";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import type { Message } from "@/lib/types";

export async function handleUserResponse(input: SimulateAiInterviewerInput) {
    try {
        const output = await simulateAiInterviewer(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to get response from AI." };
    }
}


export async function saveInterviewTranscript(interviewId: string, messages: Message[]) {
    try {
        const transcript = messages.map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`).join('\n\n');
        
        const interviewRef = doc(db, 'interviews', interviewId);

        await updateDoc(interviewRef, {
            transcript: transcript,
            status: 'Past' // Update status to Past
        });

        return { success: true };
    } catch (error) {
        console.error("Error saving transcript: ", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { success: false, error: `Failed to save transcript: ${errorMessage}` };
    }
}
