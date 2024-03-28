import { createStyles } from './types';
import colors from './constants/colors';
import Header from './components/header';
import Footer from './components/footer';
import Tracks from './components/tracks';
import AddTrackModal from './components/addTrackModal';
import Error from './components/error';

const styles = createStyles({
  parent: {
    backgroundColor: colors.pink,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});

function App() {
  return (
    <div css={styles.parent}>
      <Error />
      <Header />
      <Tracks />
      <Footer />
      <AddTrackModal />
    </div>
  );
}

export default App;
