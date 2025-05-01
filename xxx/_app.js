import "../styles/globals.css";

import { Provider } from "@/components/ui/provider";

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<Component {...pageProps} />
		</Provider>
	);
}
