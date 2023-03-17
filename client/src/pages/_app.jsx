import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { store, persistor } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout.jsx";
import { theme } from "@/styles/theme.js";
import "react-quill/dist/quill.snow.css";
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
