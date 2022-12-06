import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

// dont set DetailedHTMLProps to component because we use
// this component only in one place and dont need acces to any different properties 
// only these one that we set

export interface TopPageComponentProps {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
