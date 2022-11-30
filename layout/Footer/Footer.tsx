import styles from './Footer.module.css';
import cn from 'classnames';
import { FooterProps } from './Footer.props';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps) => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={styles.wrapper}>
				<div>
					OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права
					защищены
				</div>
				<a href="#" target="_blank">
					Пользовательское соглашение
				</a>
				<a href="#" target="_blank">
					Политика конфиденциальности
				</a>
			</div>
		</footer>
	);
};
