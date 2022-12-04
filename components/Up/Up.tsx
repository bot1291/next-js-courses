import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';

export const Up = () => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({
			opacity: (y * 1.5) / document.body.scrollHeight,
			display: 'block',
		});
		if (y === 0) {
			controls.start({ display: 'none' });
		}
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.div
			animate={controls}
			className={styles.up}
			onClick={scrollToTop}
		>
			<ButtonIcon icon='up' appearance='primary' />
		</motion.div>
	);
};
