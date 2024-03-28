import { AudioResponse } from '../types';

const actions = {
  setModal: (param: boolean) => {
    return {
      type: 'SET_MODAL',
      modal: param
    };
  },
  setFocusedTrack: (param: number) => {
    return {
      type: 'SET_FOCUSED_TRACK',
      focusedTrackIndex: param
    };
  },
  setTrack: (audio: AudioResponse, title: string, index: number) => {
    return {
      type: 'SET_TRACK',
      audio: audio,
      audioIndex: index,
      title: title
    };
  },
  deleteTrack: (index: number) => {
    return {
      type: 'DELETE_TRACK',
      audioIndex: index
    };
  },
  setLoading: (index: number, param: boolean) => {
    return {
      type: 'SET_LOADING',
      audioIndex: index,
      loadingValue: param
    };
  },
  setError: (index: number, error: string) => {
    return {
      type: 'SET_ERROR',
      audioIndex: index,
      error: error,
    }
  },
  clearError: () => {
    return {
      type: 'CLEAR_ERROR',
    }
  },
  setIsPlaying: (isPlaying: boolean) => {
    return {
      type: 'SET_IS_PLAYING',
      isPlaying: isPlaying
    };
  },
  toggleIsPlaying: () => {
    return {
      type: 'TOGGLE_IS_PLAYING'
    };
  },
  setPlaybackTime: (playbackTime: number) => {
    return {
      type: 'SET_PLAYBACK_TIME',
      playbackTime: playbackTime
    };
  },
  setTrackVolume: (index: number, volume: number) => {
    return {
      type: 'SET_TRACK_VOLUME',
      volume: volume,
      audioIndex: index
    };
  },
  setTrackMuted: (index: number, isMuted: boolean) => {
    return {
      type: 'SET_TRACK_MUTED',
      isMuted: isMuted,
      audioIndex: index
    };
  },
  toggleTrackMuted: (index: number) => {
    return {
      type: 'TOGGLE_TRACK_MUTED',
      audioIndex: index
    };
  }
};

export default actions;
