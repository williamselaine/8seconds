import { createStyles } from '../types';
import colors from '../constants/colors';
import { HEADER_HEIGHT, MAX_NUMBER_OF_TRACKS } from '../constants/constants';
import Track from './track';

const styles = createStyles({
  parent: {
    backgroundColor: colors.green50solid,
    width: '100%',
    height: `calc(90% - ${HEADER_HEIGHT}px)`,
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column'
  },
  lane: {
    display: 'flex',
    flex: '1 1 0px',
    boxShadow: colors.boxShadowLight,
    alignItems: 'center',
    color: colors.lightred,
    minHeight: '150px !important',
    overflow: 'hidden'
  }
});

function Tracks() {
  return (
    <div css={styles.parent}>
      {[...Array(MAX_NUMBER_OF_TRACKS)].map((x, i) => {
        return (
          <div css={styles.lane} key={i}>
            <Track index={i} />
          </div>
        );
      })}
    </div>
  );
}

export default Tracks;
