import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as fal from '@fal-ai/serverless-client';
import store from './redux/store';
import { Provider } from 'react-redux';
import colors from './constants/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// only used very sparingly for components that won't accept anything else
const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightred50
    },
    secondary: {
      main: colors.disabledgray
    }
  }
});

fal.config({
  credentials: `${import.meta.env.VITE_FAL_KEY_ID}:${import.meta.env.VITE_FAL_KEY_SECRET}`
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
