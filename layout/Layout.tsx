import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import {
	FunctionComponent,
	useContext,
	useState,
	KeyboardEvent,
	useRef,
} from 'react';
import {
	AppContext,
	AppContextProvider,
	IAppContext,
} from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';
import { motion } from 'framer-motion';

const Layout = ({ children }: LayoutProps) => {
	const { isOpened } = useContext(AppContext);
	const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent<HTMLAnchorElement>) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
			setIsDisplayed(false);
		}
		setIsDisplayed(false);
	};

	const variants = {
		opened: {
			height: 0,
			overflow: 'scroll',
		},
		closed: {
			height: 'auto',
			overflow: 'hidden',
		},
	};

	return (
		<motion.div
			initial="closed"
			animate={isOpened ? 'opened' : 'closed'}
			variants={variants}
			transition={{ delay: 0.4 }}
			className={cn(styles.wrapper)}
		>
			<a
				onFocus={() => setIsDisplayed(true)}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isDisplayed,
				})}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div tabIndex={0} ref={bodyRef} className={styles.body}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up />
		</motion.div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider
				menu={props.menu}
				firstCategory={props.firstCategory}
			>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
