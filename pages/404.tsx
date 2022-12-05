import { GetStaticProps } from 'next';
import { Button, Htag } from '../components';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces/menu.interface';
import styles from '../styles/error.module.css';
import { withLayout } from '../layout/Layout';
import Link from 'next/link';

export function Error404(): JSX.Element {
	return (
		<div className={styles.error}>
			<Htag tag="h1" className={styles.error404}>404</Htag>
			<Htag tag="h2" className={styles.notFound}>Страница не найдена</Htag>
			<Link href='/' className={styles.toMain}>
				<Button>Вернуться на главную</Button>
			</Link>
		</div>
	);
}

export default withLayout(Error404);

export const getStaticProps: GetStaticProps<Error404Props> = async () => {
	const firstCategory = 0;

	const menu: MenuItem[] = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({ firstCategory }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.catch((e: Error) => {
			console.log(e.message);
		});
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

export interface Error404Props extends Record<string, unknown> {
	menu: MenuItem[];
}