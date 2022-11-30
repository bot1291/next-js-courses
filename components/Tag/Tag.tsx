import styles from './Tag.module.css';
import { TagProps } from './Tag.props';

export const Tag = ({
	size = 's',
	color = 'ghost',
	href,
	className = '',
	children,
	...props
}: TagProps) => {
	return (
		<div
			{...props}
			className={`${styles.tag} ${styles[`${color}`]} ${
				styles[`${size}`]
			} ${className}`}
		>
			{href ? <a href={href}>{children}</a> : <>{children}</>}
		</div>
	);
};
