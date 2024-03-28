import { AudioHub, AudioResponse, MixerReducer } from '../types';
import { MAX_NUMBER_OF_TRACKS } from '../constants/constants';

const defaultAudioHub: AudioHub = {
  isLoading: false,
  isMuted: false,
  volume: 1.0
};

const defaultState: MixerReducer = {
  showModal: false,
  // intializes an object like { 1: AudioHub, 2: AudioHub ... }
  audio: Object.fromEntries(
    [...Array(MAX_NUMBER_OF_TRACKS).keys()].map(val => {
      return [val, <AudioHub>{ ...defaultAudioHub }];
    })
  ),
  focusedTrackIndex: -1,
  isPlaying: false,
  playbackTime: 0,
  error: '',
};

type action = {
  type: string;
  modal: boolean;
  focusedTrackIndex: number;
  audio: AudioResponse;
  audioIndex: number;
  loadingValue: boolean;
  isPlaying: boolean;
  playbackTime: number;
  title: string;
  volume: number;
  isMuted: boolean;
  error: string;
};

const reducer = (state = defaultState, action: action) => {
  switch (action.type) {
    case 'SET_MODAL': {
      return {
        ...state,
        showModal: action.modal
      };
    }
    case 'SET_FOCUSED_TRACK': {
      return {
        ...state,
        focusedTrackIndex: action.focusedTrackIndex
      };
    }
    case 'SET_TRACK': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { audioResponse: { ...action.audio }, ...defaultAudioHub, title: action.title };
      return {
        ...state,
        audio: newAudio
      };
    }
    case 'DELETE_TRACK': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = <AudioHub>{ isLoading: false };
      return {
        ...state,
        audio: newAudio
      };
    }
    case 'SET_LOADING': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { ...newAudio[action.audioIndex], isLoading: action.loadingValue };
      return {
        ...state,
        audio: newAudio
      };
    }
    case 'SET_ERROR': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { ...newAudio[action.audioIndex], isLoading: false };
      return {
        ...state,
        error: action.error,
        audio: newAudio
      }
    }
    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: '',
      }
    }
    case 'SET_IS_PLAYING': {
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    }
    case 'TOGGLE_IS_PLAYING': {
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    }
    case 'SET_PLAYBACK_TIME': {
      return {
        ...state,
        playbackTime: action.playbackTime
      };
    }
    case 'SET_TRACK_VOLUME': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { ...newAudio[action.audioIndex], volume: action.volume };
      return {
        ...state,
        audio: newAudio
      };
    }
    case 'SET_TRACK_MUTED': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { ...newAudio[action.audioIndex], isMuted: action.isMuted };
      return {
        ...state,
        audio: newAudio
      };
    }
    case 'TOGGLE_TRACK_MUTED': {
      const newAudio = { ...state.audio };
      newAudio[action.audioIndex] = { ...newAudio[action.audioIndex], isMuted: !newAudio[action.audioIndex].isMuted };
      return {
        ...state,
        audio: newAudio
      };
    }
    default:
      return state;
  }
};

export default reducer;
