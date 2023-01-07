import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import './index.css';
import { store, persistor } from "./app/store.js";
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = extendTheme({
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      'html, body': {
        background: "white",
        maxHeight: "100vh",
        height: "100vh",
        overflowY: "hidden",
        // scrollbarwWidth: "thin"
      }

    },
  },
  components: {
    Modal: {
      sizes: {
        lg: {
          dialog: {
            maxWidth: "60%",
            maxHeight: "85%",
          },
          body: {
            overflowY: "auto"
          }
        },
        md: {
          dialog: {
            minWidth: "40%",
            minHeight: "50%"
          },
          body: {
            overflowY: "auto"
          }
        }
      }
    },
  }
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

