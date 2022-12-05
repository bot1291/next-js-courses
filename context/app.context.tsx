import { createContext, PropsWithChildren, useState } from 'react';
import { MenuItem, PageItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: MenuItem[]) => void;
	menuDefault?: MenuItem[];
	isOpened?: boolean;
	setOpened?: (boolean: boolean) => void;
	handleSetSearchPages?: () => void;
	searchPages?: PageItem[];
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider = ({
	menu,
	children,
	firstCategory,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu);
	const [isOpened, setIsOpened] = useState(false);
	const [searchPages, setSearchMenu] = useState<PageItem[]>([]);

	const handleSetSearchPages = () => {
		setSearchMenu(JSON.parse(localStorage.pages));
	};

	const setOpened = (boolean: boolean) => {
		setIsOpened(boolean);
	};

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu);
	};

	return (
		<AppContext.Provider
			value={{
				isOpened,
				setOpened,
				menuDefault: menu,
				menu: menuState,
				firstCategory,
				setMenu,
				searchPages,
				handleSetSearchPages,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
