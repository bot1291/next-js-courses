// here is a different helpers which help to work with code much easily

import CoursesIcon from './icons/courses.svg';
import BooksItem from './icons/books.svg';
import ProductItem from './icons/product.svg';
import ServicesItem from './icons/services.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

// it is array of object which help create first level of sidebar

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesItem />,
		id: TopLevelCategory.Services,
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksItem />,
		id: TopLevelCategory.Books,
	},
	{
		route: 'products',
		name: 'Продукты',
		icon: <ProductItem />,
		id: TopLevelCategory.Products,
	},
];

// can delegate long number with a logic spaces and add ruble on the end

export const priceRu = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽');

// help to work with a different ending of words based on the number

export const decOfNum = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2]
	return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};
