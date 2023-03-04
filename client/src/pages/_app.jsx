import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { store, persistor } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout.jsx";

const theme = extendTheme({
	styles: {
		global: {
			"*": {
				boxSizing: "border-box",
				margin: 0,
				padding: 0,
			},
			"html, body": {
				background: "white",
				maxHeight: "100vh",
				height: "100vh",
				overflowY: "hidden",
				// scrollbarwWidth: "thin"
			},
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
						overflowY: "auto",
					},
				},
				md: {
					dialog: {
						minWidth: "40%",
						minHeight: "50%",
					},
					body: {
						overflowY: "auto",
					},
				},
			},
		},
	},
});

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
