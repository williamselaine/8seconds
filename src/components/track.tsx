import { useSelector, useDispatch } from 'react-redux';
import { MixerReducer, createStyles } from '../types';
import Waveform from './waveform';
import { AddCircleOutline } from '@mui/icons-material';
import actions from '../redux/actions';
import { CircularProgress } from '@mui/material';
import colors from '../constants/colors';
import TrackControls from './trackcontrols';
import { keyframes } from '@emotion/react';

const shrink = keyframes`
  0%   { width: 100%; }
  100% { width: 0%; }
`;

function Track({ index }: { index: number }) {
  const audioNode = useSelector((state: MixerReducer) => state.audio[index]);

  const styles = createStyles({
    trackParent: {
      position: 'relative',
      width: 'calc(100% - 124px)'
    },
    waveformParent: {
      minHeight: '128px !important',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      zIndex: '0'
    },
    title: {
      maxWidth: '80%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-block',
      color: audioNode?.isMuted ? colors.disabledgray : colors.lightred
    },
    cover: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0px',
      right: '0px',
      animation: `${shrink} 1s forwards`,
      animationDelay: '1s',
      backgroundColor: colors.green50solid,
      zIndex: 1
    }
  });

  return (
    <>
      {audioNode?.audioResponse ? (
        <TrackControls index={index} audioNode={audioNode} />
      ) : audioNode?.isLoading ? (
        <LoadingSpinner />
      ) : (
        <AddTrackButton index={index} />
      )}
      {audioNode?.audioResponse && (
        <div css={styles.trackParent}>
          <div css={styles.cover} />
          <div css={styles.waveformParent}>
            <span css={styles.title}>{audioNode.title}</span>
            <Waveform audio={audioNode?.audioResponse?.url} isPrimary={index === 0} index={index} />
          </div>
        </div>
      )}
    </>
  );
}

const AddTrackButton = ({ index }: { index: number }) => {
  const styles = createStyles({
    button: {
      backgroundColor: 'transparent',
      color: colors.lightred,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      opacity: '1.0',
      transition: 'opacity 0.5s',
      width: '100px',
      '&:hover': {
        opacity: '0.4',
        transition: 'opacity 0.5s'
      }
    },
    fullWidth: {
      width: '100%'
    },
    loadingSpinner: {
      padding: '0px 32px',
      height: '100%',
      width: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(actions.setModal(true));
    dispatch(actions.setIsPlaying(false));
    dispatch(actions.setFocusedTrack(index));
    dispatch(actions.setPlaybackTime(0));
  };

  return (
    <button css={{ ...styles.button, ...styles.fullWidth }} onClick={handler}>
      <AddCircleOutline color='inherit' fontSize='large' />
    </button>
  );
};

const LoadingSpinner = () => {
  const styles = createStyles({
    fullWidth: {
      width: '100%'
    },
    loadingSpinner: {
      padding: '0px 32px',
      height: '100%',
      width: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  return (
    <span css={{ ...styles.loadingSpinner, ...styles.fullWidth }}>
      <CircularProgress color='inherit' />
    </span>
  );
};

export default Track;
