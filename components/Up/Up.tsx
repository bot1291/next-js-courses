import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import styles from './Up.module.css';
import UpIcon from './up.svg';

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
		<motion.button
			animate={controls}
			className={styles.up}
			onClick={scrollToTop}
		>
			<UpIcon />
		</motion.button>
	);
};
