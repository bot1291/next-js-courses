import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Adventages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

// here is a template page for [alias] pages with all products for current category
// use reducer for sort products by rating or price 
// also use for reload page to get current category products when we go through courses

export const TopPageComponent = ({
	firstCategory,
	page,
	products, 
}: TopPageComponentProps) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{ products, sort: SortEnum.Rating }
	);

	useEffect(() => {
		dispatchSort({ type: SortEnum.Reload, payload: products });
	}, [products]);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort, payload: [] });
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				<Tag color="gray" size="m">
					{products.length}
				</Tag>
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProducts.length !== 0 &&
					sortedProducts.map((p) => (
						<Product layout key={p._id} product={p} />
					))}
			</div>
			<div className={styles.hhtitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Преимущества</Htag>
					<Adventages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<Htag tag="h2">Получаемые навыки</Htag>
			{page.tags.map((t) => (
				<Tag className={styles.tag} key={t} color="primary">
					{t}
				</Tag>
			))}
		</div>
	);
};
