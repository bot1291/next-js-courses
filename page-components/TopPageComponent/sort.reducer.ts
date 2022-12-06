import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

// here is a reducer which can sort by rating or price or reload page 

export type SortActions =
	| { type: SortEnum.Price }
	| { type: SortEnum.Rating }
	| { type: SortEnum.Reload; payload: ProductModel[] };

export interface SortReducerState {
	sort: SortEnum;
	products: ProductModel[];
}

export const sortReducer = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) =>
					a.initialRating > b.initialRating ? -1 : 1
				),
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) =>
					a.price > b.price ? 1 : -1
				),
			};
		case SortEnum.Reload:
			return {
				sort: SortEnum.Rating,
				products: action.payload,
			};
		default:
			throw new Error('Неверный тип сортировки');
	}
};
