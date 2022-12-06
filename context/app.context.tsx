import { createContext, PropsWithChildren, useState } from 'react';
import { MenuItem, PageItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

// set context to let props going though all app

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

// default context object

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses,
});

// create component which will be use to wrap layout

export const AppContextProvider = ({
	menu,
	children,
	firstCategory,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	
	// this state help in the situation which described in the component Menu above the useEffect

	const [menuState, setMenuState] = useState<MenuItem[]>(menu);

	// set open or close sidebar on the mobile version

	const [isOpened, setIsOpened] = useState(false);

	// this state using to let search value pass through pages

	const [searchPages, setSearchMenu] = useState<PageItem[]>([]);

	// at any pages we can write in the input search value
	// and then this value will be checked whether it match with alias or category in searchPages or not
	// if so it will be written in the localStorage and set up

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
