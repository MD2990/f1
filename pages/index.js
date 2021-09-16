import Head from 'next/head';
import Main from '../components/Main';

export default function Home() {
	return (
		<>
			<Head>
				<title>Bicycle racing game </title>
				<meta name='description' content='Simple bicycle racing game ' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main />
		</>
	);
}
