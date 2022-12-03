import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { HeaderProps } from './Header.props';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';

export const Header = ({ className, ...props }: HeaderProps) => {
	const { setOpened, isOpened } = useContext(AppContext);

	const variants = {
		opened: {
			opacity: 1,
			display: 'grid',
		},
		closed: {
			opacity: 0,
			transitionEnd: { display: 'none' },
		},
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon
				className={styles.hamb}
				onClick={() => setOpened && setOpened('button', true)}
				appearance="white"
				icon="hamb"
			/>
			<motion.div
				initial="closed"
				animate={isOpened ? 'opened' : 'closed'}
				variants={variants}
				transition={{ delay: 0.2 }}
				className={cn(styles.mobileMenu)}
			>
				<Sidebar className={styles.mobileSidebar} />
				<ButtonIcon
					onClick={() => setOpened && setOpened('button', false)}
					className={styles.menuClose}
					appearance="white"
					icon="cross"
				/>
			</motion.div>
		</header>
	);
};
