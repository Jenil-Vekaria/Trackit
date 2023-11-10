import { theme } from "@/styles/theme.js";
import { ChakraProvider } from "@chakra-ui/provider";
import "@inovua/reactdatagrid-community/index.css";
import "@inovua/reactdatagrid-community/style/base.scss";
import "react-quill/dist/quill.snow.css";
import { SWRDevTools } from "swr-devtools";
import Layout from "@/components/layout.jsx";
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
  return (
    <SWRDevTools>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SWRDevTools>
  );
};

export default App;
