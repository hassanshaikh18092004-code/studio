'use server';

import { summarizeChallenge as summarizeChallengeFlow } from '@/ai/flows/summarize-challenge';
import { CHALLENGE_DESCRIPTION } from '@/lib/maze-config';

class AiTutorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AiTutorError';
  }
}

export async function getSimpleSummary(): Promise<{summary: string, error?: undefined} | {summary?: undefined, error: string}> {
  try {
    const result = await summarizeChallengeFlow({
      challengeDescription: CHALLENGE_DESCRIPTION,
    });
    return { summary: result.simpleSummary };
  } catch (error) {
    console.error('Error getting AI summary:', error);
    return { error: 'Sorry, the AI Tutor is taking a break. Please try again later.' };
  }
}
