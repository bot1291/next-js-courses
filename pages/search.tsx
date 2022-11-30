import { GetStaticProps } from 'next';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Search(): JSX.Element {
	return (
		<>
			Search
		</>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;

	const menu: MenuItem[] = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
		{
			method: 'POST',
			body: JSON.stringify({ firstCategory }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)
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

export interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
