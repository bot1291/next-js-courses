import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { HeaderProps } from './Header.props';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import Link from 'next/link';

// header template for layout 
// it is visible only on mobile version

export const Header = ({ className, ...props }: HeaderProps) => {
	const { setOpened, isOpened } = useContext(AppContext);

	const variants = {
		opened: {
			opacity: 1,
			display: 'grid',
			x: 0,
			transition: {
				stiffness: 100,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
			transitionEnd: { display: 'none' },
		},
	};

	// slowly paint the button based on how much we scrolled which help us to destination top

	const handleHambButton = () => {
		if (window.scrollY === 0) {
			setOpened && setOpened(true);
		} else {
			setTimeout(() => setOpened && setOpened(true), 800);
		}
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Link href="/">
				<Logo />
			</Link>
			<ButtonIcon
				className={styles.hamb}
				onClick={handleHambButton}
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
					onClick={() => setOpened && setOpened(false)}
					className={styles.menuClose}
					appearance="white"
					icon="cross"
				/>
			</motion.div>
		</header>
	);
};
