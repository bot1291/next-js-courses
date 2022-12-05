import { InDevelopmentProps } from './InDevelopment.props';
import styles from './InDevelopment.module.css';
import cn from 'classnames';
import { Htag } from '../Htag/Htag';
import Link from 'next/link';
import { Button } from '../Button/Button';

export const InDevelopment = ({ className, ...props }: InDevelopmentProps) => {
	return (
		<div className={cn(className, styles.develop)} {...props}>
			<Htag tag="h1" className={styles.title}>
				В разработке
			</Htag>
			<Htag tag="h2" className={styles.text}>
				Страница, в данный момент, находится в разработке
			</Htag>
			<Link href="/" className={styles.toMain}>
				<Button>Вернуться на главную</Button>
			</Link>
		</div>
	);
};
