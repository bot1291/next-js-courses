import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import {
	TopLevelCategory,
	TopPageModel,
} from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { withLayout } from '../../layout/Layout';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';
import { InDevelopment } from '../../components';

// create page template for [alias] alias (example ./courses/photoshop, /courses/[alias])
// and set head params which based on the backend data only for this alias
// if were not any products drop InDevelopment component

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	if (!page || !products.length) {
		return <InDevelopment />;
	}
	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name="description" content={page.metaDescription} />
				<meta property="og:title" content={page.metaTitle} />
				<meta
					property="og:description"
					content={page.metaDescription}
				/>
				<meta property="og:type" content="article" />
			</Head>
			<TopPageComponent
				firstCategory={firstCategory}
				page={page}
				products={products}
			/>
		</>
	);
}

// wrap all [alias] alias components in the layout and then export it

export default withLayout(TopPage);

// get all possible paths to current alias
// and drop 404 error page for all different paths that dont math with array paths

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	for (const m of firstLevelMenu) {
		const menu: MenuItem[] = await fetch(API.topPage.find, {
			method: 'POST',
			body: JSON.stringify({ firstCategory: m.id }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.catch((e: Error) => {
				console.log(e.message);
			});
		paths = paths.concat(
			menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
		);

		// one button add ref to the link params on what next.js drop a error
		// which say that paths dont match so it is need to add paths with #ref on the end

		paths = paths.concat(
			menu.flatMap((s) =>
				s.pages.map((p) => `/${m.route}/${p.alias}#ref`)
			)
		);
	}
	return {
		paths,
		fallback: false,
	};
};

// here we get data for second level of sidebar which based on the link
// params get us path to [alias] alias and [type] alias            
// params we get from getStaticProps as a property
// also get model for page foundation based on the [alias] which we get from params
// and also get array of products which based on the page model category
// we also check whether got data or not or if there were any error if not drop 404 error page

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	// compare link params with the keys which set before
	// we also check whether got data or not if not drop 404 error page

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

		if (menu.length === 0) {
			return {
				notFound: true,
			};
		}

		const page: TopPageModel = await fetch(
			API.topPage.byAlias.alias(params.alias),
			{
				method: 'GET',
				credentials: 'include',
			}
		).then((response) => response.json());

		const products: ProductModel[] = await fetch(API.product.find, {
			method: 'POST',
			body: JSON.stringify({
				category: page.category,
				limit: 10,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => response.json());

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

export interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
