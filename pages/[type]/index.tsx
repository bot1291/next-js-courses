import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';

function Type({ firstCategory }: TypeProps): JSX.Element {
	return <>Type: {firstCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map((m) => `/${m.route}`),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}
	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	const menu: MenuItem[] = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
		{
			method: 'POST',
			body: JSON.stringify({ firstCategory: firstCategoryItem.id }),
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
			firstCategory: firstCategoryItem.id,
		},
	};
};

export interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
