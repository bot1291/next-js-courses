import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { InDevelopment } from '../../components';
import { API } from '../../helpers/api';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';

// create page template for [type] alias (example ./courses, ./[type])
// templates for [type] alias pages in development mode so just drop InDevelopment component

function Type(): JSX.Element {
	return <InDevelopment />;
}

// wrap all [type] alias components in the layout and then export it

export default withLayout(Type);

// get all possible paths to current alias
// and drop 404 error page for all different paths that dont match with array paths

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map((m) => `/${m.route}`),
		fallback: false,
	};
};

// here we get data for second level of sidebar which based on the link
// params get us path to [type] alias
// params we get from getStaticProps as a property
// we also check whether got data or not or if there were any error if so drop 404 error page

export const getStaticProps: GetStaticProps<TypeProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	// compare link params with the keys which set before

	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const menu: MenuItem[] = await fetch(API.topPage.find, {
			method: 'POST',
			body: JSON.stringify({ firstCategory: firstCategoryItem.id }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => response.json());
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
