import * as fal from '@fal-ai/serverless-client';
import { AudioResponse, AudioResult } from '../types';
import { EX_RESPONSES } from '../constants/constants';

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const FalService = {
  fetchAudio: async (promptText: string, isTest: boolean): Promise<AudioResponse> => {
    let result: AudioResult;
    // todo validate input string? ie not too long
    if (isTest) {
      await wait(3000);
      result = EX_RESPONSES[Math.floor(Math.random() * EX_RESPONSES.length)];
    } else {
      result = await fal.subscribe('fal-ai/musicgen', {
        input: {
          prompt: promptText
        },
        logs: true,
        onQueueUpdate: update => {
          if (update.status === 'IN_PROGRESS') {
            // update.logs?.map(log => log.message).forEach(console.log);
          }
        }
      });
    }
    // todo handle errors
    return result.audio_url;
  }
};

export default FalService;
