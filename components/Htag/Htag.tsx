import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';

export const Htag = ({
	tag,
	children,
	className = '',
	...props
}: HtagProps): JSX.Element => {
	switch (tag) {
		case 'h1':
			return (
				<h1 className={`${styles.h1} ${className}`} {...props}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 className={`${styles.h2} ${className}`} {...props}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={`${styles.h3} ${className}`} {...props}>
					{children}
				</h3>
			);
		default:
			return <></>;
	}
};
