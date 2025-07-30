'use server';

import { simulateAiInterviewer, SimulateAiInterviewerInput } from "@/ai/flows/simulate-ai-interviewer";

export async function handleUserResponse(input: SimulateAiInterviewerInput) {
    try {
        const output = await simulateAiInterviewer(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to get response from AI." };
    }
}
