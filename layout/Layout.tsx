import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { FunctionComponent, useContext } from 'react';
import { AppContext, AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';
import { motion } from 'framer-motion';

const Layout = ({ children }: LayoutProps) => {
	const { isOpened } = useContext(AppContext);

	const variants = {
		opened: {
			height: 0,
		},
		closed: {
			height: 'auto',
		},
	};


	return (
		<motion.div
			initial="closed"
			animate={isOpened ? 'opened' : 'closed'}
			variants={variants}
			transition={{ delay: 0.4 }}
			className={cn(styles.wrapper, {
				[styles.closed]: isOpened,
			})}
		>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body}>{children}</div>
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
