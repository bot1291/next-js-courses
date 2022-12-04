import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import { useEffect } from 'react';

export default function App({
	Component,
	pageProps,
	router,
}: AppProps): JSX.Element {
	useEffect(() => {
		router.events.on('routeChangeComplete', (url: string) => {
			if (typeof window !== undefined) {
				ym('hit', url);
			}
		});
	}, [router.events]);
	return (
		<>
			<Head>
				<title>OWL top</title>
				<meta name="description" content="Site about courses" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`}
				/>
				<meta property="og:locale" content="ru_RU" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://mc.yandex.ru" />
			</Head>
			<YMInitializer
				accounts={[]}
				options={{ webvisor: true, defer: true }}
				version="2"
			/>
			<Component {...pageProps} />
		</>
	);
}
