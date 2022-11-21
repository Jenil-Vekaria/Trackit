import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import store from "./app/store";
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = extendTheme({
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        overflow: "none"
      },
      'html, body': {
        background: "white",
        maxHeight: "100vh",
        height: "100vh"
      },

    },
  },
  components: {
    Modal: {
      sizes: {
        "2xl": {
          dialog: { minHeight: "32rem", maxHeight: "32rem" }
        }
      }
    }
  }
});

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </Provider>
);

