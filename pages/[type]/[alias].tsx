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

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	return (
		<TopPageComponent
			firstCategory={firstCategory}
			page={page}
			products={products}
		/>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	for (const m of firstLevelMenu) {
		const menu: MenuItem[] = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
			{
				method: 'POST',
				body: JSON.stringify({ firstCategory: m.id }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
			.then((response) => response.json())
			.catch((e: Error) => {
				console.log(e.message);
			});
		paths = paths.concat(
			menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
		);
	}

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
		const menu: MenuItem[] = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
			{
				method: 'POST',
				body: JSON.stringify({ firstCategory: firstCategoryItem.id }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		).then((response) => response.json());

		if (menu.length === 0) {
			return {
				notFound: true,
			};
		}

		const page: TopPageModel = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`,
			{
				method: 'GET',
				credentials: 'include',
			}
		).then((response) => response.json());

		const products: ProductModel[] = await fetch(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
			{
				method: 'POST',
				body: JSON.stringify({
					category: page.category,
					limit: 10,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		).then((response) => response.json());

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
