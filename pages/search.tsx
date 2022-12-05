import { GetStaticProps } from 'next';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/app.context';
import { Htag, Tag } from '../components';
import styles from '../styles/search.module.css';
import { PageBlock } from '../components/PageBlock/PageBlock';

function Search(): JSX.Element {
	const { searchPages, handleSetSearchPages } = useContext(AppContext);

	useEffect(() => {
		handleSetSearchPages && handleSetSearchPages();
	}, []);

	return (
		<div className={styles.home}>
			<Htag tag="h1" className={styles.complitation}>
				{searchPages && searchPages.length
					? 'Все найденные категории по заданному поиску'
					: 'Категорий не найдено'}
			</Htag>
			{searchPages && !!searchPages.length && (
				<Tag className={styles.countPages} color='gray'>{searchPages.length}</Tag>
			)}
			<div className={styles.categoriesBlock}>
				{searchPages?.map((p) => (
					<PageBlock key={p._id} page={p} />
				))}
			</div>
		</div>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SeacrhProps> = async () => {
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

export interface SeacrhProps extends Record<string, unknown> {
	menu: MenuItem[];
}
