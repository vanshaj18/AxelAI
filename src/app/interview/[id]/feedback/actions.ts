'use server';

import { generateInterviewFeedback, GenerateInterviewFeedbackInput } from "@/ai/flows/generate-interview-feedback";

export async function getFeedback(input: GenerateInterviewFeedbackInput) {
    try {
        const output = await generateInterviewFeedback(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate feedback from AI." };
    }
}
