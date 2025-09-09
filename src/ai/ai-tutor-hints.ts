'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing context-aware hints to players who are stuck on a puzzle.
 *
 * - provideHint - A function that takes the current game state and puzzle definition as input and returns a hint.
 * - ProvideHintInput - The input type for the provideHint function.
 * - ProvideHintOutput - The return type for the provideHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideHintInputSchema = z.object({
  gameState: z
    .string()
    .describe('The current state of the game, including the player’s current code and the game board.'),
  puzzleDefinition: z.string().describe('The definition of the puzzle, including the goal and constraints.'),
});
export type ProvideHintInput = z.infer<typeof ProvideHintInputSchema>;

const ProvideHintOutputSchema = z.object({
  hint: z.string().describe('A context-aware hint to help the player solve the puzzle.'),
});
export type ProvideHintOutput = z.infer<typeof ProvideHintOutputSchema>;

export async function provideHint(input: ProvideHintInput): Promise<ProvideHintOutput> {
  return provideHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideHintPrompt',
  input: {schema: ProvideHintInputSchema},
  output: {schema: ProvideHintOutputSchema},
  prompt: `You are an AI tutor providing hints to a player who is stuck on a coding puzzle game.

  The player’s current game state is:
  {{gameState}}

  The puzzle definition is:
  {{puzzleDefinition}}

  Provide a context-aware hint to help the player solve the puzzle. The hint should be specific and actionable, guiding the player towards a solution without giving away the answer directly.`,
});

const provideHintFlow = ai.defineFlow(
  {
    name: 'provideHintFlow',
    inputSchema: ProvideHintInputSchema,
    outputSchema: ProvideHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
