import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { store, persistor } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout.jsx";
import "../styles/globals.scss";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	styles: {
		global: {
			"*": {
				boxSizing: "border-box",
				margin: 0,
				padding: 0,
				fontFamily: `"Roboto", "Sans-sarif", "Times New Roman"`,
			},
			"html, body": {
				backgroundColor: "#182130",
				maxHeight: "100vh",
				height: "100vh",
				overflowY: "hidden",
			},
		},
	},
	colors: {
		primary: "#182130",
		secondary: "#151c29",
		hover: "#435572",
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "500",
			},
		},
		Modal: {
			sizes: {
				lg: {
					dialog: {
						maxWidth: "60%",
						maxHeight: "85%",
						backgroundColor: "#182130",
					},
					body: {
						overflowY: "auto",
					},
				},
				md: {
					dialog: {
						minWidth: "40%",
						minHeight: "50%",
						backgroundColor: "#182130",
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
