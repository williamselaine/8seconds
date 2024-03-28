import { AudioResponse } from '../types';
import { EX_RESPONSES } from '../constants/constants';

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const FalService = {
  fetchAudio: async (promptText: string, isTest: boolean): Promise<AudioResponse> => {
    if (isTest) {
      await wait(3000);
      const res = EX_RESPONSES[Math.floor(Math.random() * EX_RESPONSES.length)];
      return res.audio_url;
    } else {
      let err: string = '';
      const res = await fetch(`${import.meta.env.VITE_PROXY_URL}/api/musicgen?prompt=${promptText}`)
        .then((response) => {
          if (response.ok) return response.json();
          return Promise.reject(`Error ${response.status} on proxy server!`)
         })
        .catch(error => {
          err = error;
      });
      if(res) {
        return res.audio_url;
      } else {
        return Promise.reject(err ? err : `Error on proxy server!`);
      }
    }
  }
};

export default FalService;
