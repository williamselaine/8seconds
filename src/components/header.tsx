import { createStyles } from '../types';
import colors from '../constants/colors';
import type from '../constants/type';
import { EX_AUDIO_URL, HEADER_HEIGHT } from '../constants/constants';
import Waveform from './waveform';
import { keyframes } from '@emotion/react';

const shrink = keyframes`
  0%   { width: 100%; }
  2%  { width: 50%; }
  4% { width: 0%; }
  96% { width: 0%; }
  98% { width: 50%; }
  100% { width: 100%; }
`;

const fadeIn = keyframes`
  0%   { opacity: 0.0; }
  50%  { opacity: 0.4; }
  100% { opacity: 1.0; }
`;

const styles = createStyles({
  parent: {
    backgroundColor: colors.green,
    width: '100%',
    height: `${HEADER_HEIGHT}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  header: {
    font: type.h2,
    color: colors.lightred,
    padding: '0px 30px',
    position: 'absolute',
    top: '0px',
    right: '0px',
    zIndex: '2',
    animation: `${fadeIn} 0.75s forwards`
  },
  waveform: {
    width: '300px',
    overflow: 'hidden',
    zIndex: '0'
  },
  cover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    right: '0px',
    animation: `${shrink} 30s ease infinite`,
    animationDelay: '1s',
    backgroundColor: colors.green,
    zIndex: 1
  }
});

function Header() {
  return (
    <div css={styles.parent}>
      <div css={styles.cover}></div>
      <span css={styles.waveform}>
        <Waveform audio={EX_AUDIO_URL} interact={false} color={[colors.purple, colors.lightred30]} height={300} />
      </span>
      <span css={styles.header}>8seconds</span>
    </div>
  );
}

export default Header;
