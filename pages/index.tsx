import { GetStaticProps } from 'next';
import { Htag, Tag } from '../components/';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import styles from '../styles/main.module.css';
import { CourseBlock } from '../components/CourseBlock/CourseBlock';

function Home({ menu }: HomeProps): JSX.Element {
	return (
		<div className={styles.home}>
			<Htag tag="h1" className={styles.complitation}>
				Подборка онлайн курсов
			</Htag>
			<Htag tag="h2" className={styles.allCoursesTitle}>
				Ниже представлены все доступные курсы на сайте
			</Htag>
			<Tag color="gray" className={styles.length}>
				{menu.length}
			</Tag>
			<div className={styles.coursesBlock}>
				{menu.map((m) => (
					<CourseBlock key={m._id.secondCategory} menu={m} />
				))}
			</div>
		</div>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
		},
	};
};

export interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
}
