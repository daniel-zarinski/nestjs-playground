import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createStores, StoresProvider } from './stores';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <StoresProvider stores={createStores()}>
      <App />
    </StoresProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
