import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document';

// create page template for all pages
// export fonts here, because next.js recommend to export fonts immediately on all pages,
// dont use it in a single one

export default class MyDocument extends Document {
	static async getIinitialProps(
		context: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(context);
		return { ...initialProps };
	}

	render(): JSX.Element {
		return (
			<Html lang="ru">
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
