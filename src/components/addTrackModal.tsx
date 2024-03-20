import { useState, createRef, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import FalService from '../services/FalService';
import useOutsideAlerter from '../utils/useOutsideAlerter.js';
import colors from '../constants/colors';
import { createStyles, MixerReducer } from '../types';
import type from '../constants/type.js';
import { PLACEHOLDERS, IS_TEST_MODE } from '../constants/constants';

const AddTrackModal = () => {
  const focusedTrackIndex = useSelector((state: MixerReducer) => state.focusedTrackIndex);
  const showModal = useSelector((state: MixerReducer) => state.showModal);
  const [promptText, setPromptText] = useState('');
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
  const modalRef = createRef();
  const dispatch = useDispatch();

  const styles = createStyles({
    background: {
      transition: 'opacity 1s, visibility 0s',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      backgroundColor: colors.pink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9998',
      visibility: showModal ? 'visible' : 'hidden',
      opacity: showModal ? '0.4' : '0'
    },
    flexContainer: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9998',
      visibility: showModal ? 'visible' : 'hidden',
      opacity: showModal ? '1.0' : '0.0'
    },
    content: {
      width: '350px',
      padding: '12px',
      maxWidth: '500px',
      height: '200px',
      backgroundColor: colors.lightgreen,
      opacity: '1',
      zIndex: '9999',
      margin: 'auto',
      fontSize: '1.2em',
      boxShadow: colors.boxShadow,
      position: 'relative'
    },
    title: {
      font: type.h3,
      color: colors.lightred,
      backgroundColor: 'transparent'
    },
    buttonContainer: {
      position: 'absolute',
      bottom: '0px',
      padding: '24px 0px',
      width: 'calc(100% - 24px)',
      float: 'right',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      width: '100px',
      height: '38px',
      margin: '0px 0px 0px 12px',
      border: `2px solid ${colors.lightred}`,
      color: colors.lightred,
      backgroundColor: 'transparent',
      font: type.body,
      boxShadow: colors.boxShadowLight,
      '&:hover': {
        opacity: '0.4'
      }
    },
    input: {
      width: '100%',
      height: '56px',
      font: type.body,
      color: colors.lightred,
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${colors.lightred}`,
      boxShadow: colors.boxShadow,
      outline: 'none',
      padding: '0px',
      margin: '0px',
      fontStyle: 'italic',
      '&::placeholder': {
        color: colors.lightred50
      }
    }
  });

  const confirm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(actions.setLoading(focusedTrackIndex, true));
    dispatch(actions.setModal(false));
    dispatch(actions.setPlaybackTime(0));
    FalService.fetchAudio(promptText || placeholder, IS_TEST_MODE).then(res =>
      dispatch(actions.setTrack(res, promptText || placeholder, focusedTrackIndex))
    );
    setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
    setPromptText('');
  };

  const cancel = () => {
    dispatch(actions.setModal(false));
    setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
    setPromptText('');
  };

  useOutsideAlerter(modalRef, cancel, showModal);

  return (
    <>
      <div css={styles.background} />
      <div css={styles.flexContainer}>
        <div css={styles.content} ref={modalRef as React.RefObject<HTMLDivElement>}>
          <h3 css={styles.title}>add track</h3>
          <form onSubmit={confirm}>
            <textarea
              css={styles.input}
              placeholder={placeholder}
              onChange={e => setPromptText(e.target.value)}
              value={promptText}
            />
            <div css={styles.buttonContainer}>
              <button type='button' css={styles.button} onClick={cancel}>
                cancel
              </button>
              <button type='submit' css={styles.button} onClick={confirm}>
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTrackModal;
