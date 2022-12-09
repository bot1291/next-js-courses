import { GetStaticProps } from 'next';
import { Button, Htag } from '../components';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import styles from '../styles/error.module.css';
import { withLayout } from '../layout/Layout';
import Link from 'next/link';

// also export component to make use him in different places

export function Error404(): JSX.Element {
	return (
		<div className={styles.error}>
			<Htag tag="h1" className={styles.error404}>
				404
			</Htag>
			<Htag tag="h2" className={styles.notFound}>
				Страница не найдена
			</Htag>
			<Link href="/" className={styles.toMain}>
				<Button>Вернуться на главную</Button>
			</Link>
		</div>
	);
}

// wrap current page component in the layout and then export it

export default withLayout(Error404);

// get data from backend on server side for sidebar
// check if there were any error if so drop 404 error page

export const getStaticProps: GetStaticProps<Error404Props> = async () => {
	const firstCategory = 0;

	
	try {
		const menu: MenuItem[] = await fetch(API.topPage.find, {
			method: 'POST',
			body: JSON.stringify({ firstCategory }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => response.json());
		return {
			props: {
				menu,
				firstCategory,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export interface Error404Props extends Record<string, unknown> {
	menu: MenuItem[];
}
