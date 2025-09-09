'use server';

import { summarizeChallenge as summarizeChallengeFlow, SummarizeChallengeInput } from '@/ai/flows/summarize-challenge';

class AiTutorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AiTutorError';
  }
}

export async function getSimpleSummary(input: SummarizeChallengeInput): Promise<{summary: string, error?: undefined} | {summary?: undefined, error: string}> {
  try {
    const result = await summarizeChallengeFlow(input);
    return { summary: result.simpleSummary };
  } catch (error) {
    console.error('Error getting AI summary:', error);
    return { error: 'Sorry, the AI Tutor is taking a break. Please try again later.' };
  }
}
