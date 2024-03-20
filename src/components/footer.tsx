import { AudioHub, createStyles, MixerReducer } from '../types';
import colors from '../constants/colors';
import github from '../assets/github.png';
import { PlayArrow, Pause, Stop, Download } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import Crunker from 'crunker';

const GITHUB_URL = 'https://github.com/williamselaine';

const styles = createStyles({
  parent: {
    backgroundColor: colors.green,
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    opacity: 1.0,
    transition: 'opacity 0.5s',
    '&:hover': {
      opacity: 0.4
    }
  },
  image: {
    height: '32px',
    padding: '0px 30px',
    transform: 'rotate(0deg)',
    transition: 'transform 2s'
  },
  controls: {
    padding: '0px 30px',
    height: '100%'
  },
  button: {
    backgroundColor: 'transparent',
    color: colors.lightred,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    opacity: '1.0',
    transition: 'opacity 0.5s',
    height: '100%',
    '&:hover': {
      opacity: '0.4',
      transition: 'opacity 0.5s'
    }
  }
});

function Footer() {
  const isPlaying = useSelector((state: MixerReducer) => state.isPlaying);
  const audio = useSelector((state: MixerReducer) => state.audio);
  const dispatch = useDispatch();
  const crunker = new Crunker();

  const stop = () => {
    dispatch(actions.setIsPlaying(false));
    setTimeout(() => dispatch(actions.setPlaybackTime(0)), 100);
  };

  const download = () => {
    const wavs = Object.values(audio).reduce<string[]>((accumulator: string[], audioHub: AudioHub) => {
      if (audioHub?.audioResponse?.file_name) {
        accumulator.push(audioHub.audioResponse.url);
      }
      return accumulator;
    }, []);
    crunker
      .fetchAudio(...wavs)
      .then(buffers => {
        return crunker.mergeAudio(buffers);
      })
      .then(merged => {
        return crunker.export(merged, 'audio/wav');
      })
      .then(output => {
        crunker.download(output.blob);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div css={styles.parent}>
      <div css={styles.controls}>
        <button css={styles.button} onClick={() => dispatch(actions.toggleIsPlaying())}>
          {isPlaying ? <Pause fontSize='large' color='inherit' /> : <PlayArrow fontSize='large' color='inherit' />}
        </button>
        <button css={styles.button} onClick={() => stop()}>
          <Stop fontSize='large' color='inherit' />
        </button>
        <button css={styles.button} onClick={download}>
          <Download fontSize='large' color='inherit' />
        </button>
      </div>
      <a css={styles.link} href={GITHUB_URL}>
        <img css={styles.image} src={github} alt='link' />
      </a>
    </div>
  );
}

export default Footer;
