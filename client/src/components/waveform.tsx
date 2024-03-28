import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import colors from '../constants/colors';
import { createStyles, MixerReducer } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';

const styles = createStyles({
  parent: {
    width: '100%',
    height: '100%'
  }
});

function Waveform({
  audio,
  interact = true,
  color = colors.lightred50,
  height = 'auto',
  index = -1
}: {
  audio: string | undefined;
  interact?: boolean;
  color?: string | string[];
  height?: number | 'auto';
  index?: number;
}) {
  const isPlaying = useSelector((state: MixerReducer) => state.isPlaying);
  const playbackTime = useSelector((state: MixerReducer) => state.playbackTime);
  const audioNode = useSelector((state: MixerReducer) => state.audio[index]);
  const containerRef = useRef<HTMLInputElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let waveSurfer: WaveSurfer;
    if (containerRef.current && audio) {
      waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: color,
        progressColor: color,
        barWidth: 4,
        interact: interact,
        height: height
      });
      waveSurfer.load(audio);
      waveSurfer.on('ready', () => {
        waveSurferRef.current = waveSurfer;
      });
      waveSurfer.on('click', () => {
        const currentTime = waveSurferRef.current?.getCurrentTime();
        if (currentTime) {
          dispatch(actions.setPlaybackTime(currentTime));
        }
      });
      waveSurfer.on('finish', () => {
        waveSurferRef.current?.play();
      });
    }
    return () => {
      waveSurfer.destroy();
    };
  }, [dispatch, containerRef, audio, interact, color, height]);

  useEffect(() => {
    if (interact) {
      isPlaying ? waveSurferRef.current?.play() : waveSurferRef?.current?.pause();
      if (!isPlaying) {
        const currentTime = waveSurferRef.current?.getCurrentTime();
        if (currentTime) {
          dispatch(actions.setPlaybackTime(currentTime));
        }
      }
    }
  }, [dispatch, interact, isPlaying]);

  useEffect(() => {
    if (interact) {
      waveSurferRef.current?.setTime(playbackTime);
    }
  }, [interact, playbackTime, index]);

  useEffect(() => {
    if (interact) {
      waveSurferRef.current?.setMuted(audioNode.isMuted);
      waveSurferRef.current?.setOptions({
        waveColor: audioNode.isMuted ? colors.disabledgray : color,
        progressColor: audioNode.isMuted ? colors.disabledgray : color
      });
      waveSurferRef.current?.setVolume(audioNode.volume);
    }
  }, [interact, audioNode, color]);

  return <div css={styles.parent} ref={containerRef} />;
}

export default Waveform;
