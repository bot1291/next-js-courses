import { PageBlockProps } from './PageBlock.props';
import styles from './PageBlock.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import Link from 'next/link';
import { Htag } from '../Htag/Htag';
import { Divider } from '../Divider/Divider';

export const PageBlock = ({ page, className, ...props }: PageBlockProps) => {
	return (
		<div className={cn(className, styles.pageBlock)} {...props}>
			<Card className={styles.page} key={page._id}>
				<Htag tag='h3' className={styles.pageCategory}>{page.title}</Htag>
				<Divider />
				<Link className={styles.link} href={`/courses/${page.alias}`}>
					<Button>Перейти на курса</Button>
				</Link>
			</Card>
		</div>
	);
};
