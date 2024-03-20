import { Interpolation, Theme } from '@emotion/react';

export function createStyles<T extends { [key: string]: Interpolation<Theme> }>(arg: T): T {
  return arg;
}

export type AudioResponse = {
  url: string;
  content_type: string;
  file_name: string;
  file_size: number;
};

// response from API is nested
export type AudioResult = {
  audio_url: AudioResponse;
};

export type AudioHub = {
  audioResponse?: AudioResponse;
  isLoading: boolean;
  title?: string;
  isMuted: boolean;
  volume: number;
};

export type MixerReducer = {
  showModal: boolean;
  audio: { [key: number]: AudioHub };
  focusedTrackIndex: number;
  isPlaying: boolean;
  playbackTime: number;
};
