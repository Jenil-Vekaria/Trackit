import { theme } from "@/styles/theme.js";
import { ChakraProvider } from "@chakra-ui/provider";
import "@inovua/reactdatagrid-community/index.css";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout.jsx";
import { persistor, store } from "../store/store.js";
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
