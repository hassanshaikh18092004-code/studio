// Summarize the challenge to the user
'use server';
/**
 * @fileOverview A flow that summarizes the challenge goal for the user in simpler terms.
 *
 * - summarizeChallenge - A function that summarizes the challenge.
 * - SummarizeChallengeInput - The input type for the summarizeChallenge function.
 * - SummarizeChallengeOutput - The return type for the summarizeChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChallengeInputSchema = z.object({
  challengeDescription: z.string().describe('The original description of the challenge.'),
});
export type SummarizeChallengeInput = z.infer<typeof SummarizeChallengeInputSchema>;

const SummarizeChallengeOutputSchema = z.object({
  simpleSummary: z.string().describe('A simplified summary of the challenge goal.'),
});
export type SummarizeChallengeOutput = z.infer<typeof SummarizeChallengeOutputSchema>;

export async function summarizeChallenge(input: SummarizeChallengeInput): Promise<SummarizeChallengeOutput> {
  return summarizeChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChallengePrompt',
  input: {schema: SummarizeChallengeInputSchema},
  output: {schema: SummarizeChallengeOutputSchema},
  prompt: `You are an expert tutor, specializing in simplifying coding concepts for beginners.

  Please summarize the following challenge description in simple terms that are easy to understand.

  Challenge Description: {{{challengeDescription}}}
  `,
});

const summarizeChallengeFlow = ai.defineFlow(
  {
    name: 'summarizeChallengeFlow',
    inputSchema: SummarizeChallengeInputSchema,
    outputSchema: SummarizeChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
