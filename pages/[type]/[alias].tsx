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
import { Error404 } from '../404';
import { Htag } from '../../components';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	if (!page || !products.length) {
		return <Htag tag='h1' >Страница находится в разработке</Htag>;
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

export default withLayout(TopPage);

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
		paths = paths.concat(
			menu.flatMap((s) =>
				s.pages.map((p) => `/${m.route}/${p.alias}#ref`)
			)
		);
	}
	console.log(paths);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
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
