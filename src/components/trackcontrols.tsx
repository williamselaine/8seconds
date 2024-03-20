import { useSelector, useDispatch } from 'react-redux';
import { MixerReducer, AudioHub, createStyles } from '../types';
import { HighlightOff, VolumeOff, VolumeUp } from '@mui/icons-material';
import actions from '../redux/actions';
import { Slider } from '@mui/material';
import colors from '../constants/colors';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0%   { opacity: 0.0; }
  50%  { opacity: 0.4; }
  100% { opacity: 1.0; }
`;

const styles = createStyles({
  button: {
    backgroundColor: 'transparent',
    color: colors.lightred,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    opacity: '1.0',
    transition: 'opacity 0.5s',
    width: '50px',
    '&:hover': {
      opacity: '0.4',
      transition: 'opacity 0.5s'
    }
  },
  trackControls: {
    opacity: '0.0',
    height: '80%',
    display: 'flex',
    color: colors.lightred,
    padding: '12px 0px',
    animation: `${fadeIn} 0.75s forwards`,
    animationDelay: '1.5s'
  },
  buttonColumn: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  sliderParent: {
    margin: '24px 0px 24px 24px'
  }
});

function TrackControls({ index, audioNode }: { index: number; audioNode: AudioHub }) {
  const dispatch = useDispatch();

  const setVolume = (e: Event, newValue: number | number[]) => {
    dispatch(actions.setTrackVolume(index, newValue as number));
  };

  return (
    <div css={styles.trackControls}>
      <div css={styles.sliderParent}>
        <Slider
          disabled={audioNode.isMuted}
          onChange={setVolume}
          size='medium'
          orientation='vertical'
          aria-label='volume'
          defaultValue={1.0}
          min={0}
          max={1}
          step={0.01}
          color='primary'
        />
      </div>
      <div css={styles.buttonColumn}>
        <MuteButton index={index} />
        <DeleteTrackButton index={index} />
      </div>
    </div>
  );
}

const DeleteTrackButton = ({ index }: { index: number }) => {
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(actions.deleteTrack(index));
  };

  return (
    <button css={styles.button} onClick={handler}>
      <HighlightOff color='inherit' />
    </button>
  );
};

const MuteButton = ({ index }: { index: number }) => {
  const isMuted = useSelector((state: MixerReducer) => state.audio[index].isMuted);
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(actions.toggleTrackMuted(index));
  };

  return (
    <button css={styles.button} onClick={handler}>
      {isMuted ? <VolumeOff color='secondary' /> : <VolumeUp color='inherit' />}
    </button>
  );
};

export default TrackControls;
