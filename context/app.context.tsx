import { createContext, PropsWithChildren, useState } from 'react';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: MenuItem[]) => void;
	menuDefault?: MenuItem[];
	isOpened?: boolean;
	setOpened?: (boolean: boolean) => void;
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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
