import { CourseBlockProps } from './CourseBlock.props';
import styles from './CourseBlock.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Htag } from '../Htag/Htag';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';

export const CourseBlock = ({
	menu,
	className,
	...props
}: CourseBlockProps) => {
	const [isFullOpened, setIsFullOpened] = useState<boolean>(false);
	
	return (
		<div className={cn(className)} {...props}>
			<Card className={styles.category} key={menu._id.secondCategory}>
				<Htag className={styles.courseName} tag="h3">
					{menu._id.secondCategory}
				</Htag>
				<div className={styles.courses}>
					{isFullOpened &&
						menu.pages.map((p) => (
							<Link
								className={styles.courseLink}
								key={p._id}
								href={`/courses/${p.alias}`}
							>
								{p.title}
							</Link>
						))}
					{!isFullOpened &&
						menu.pages.slice(0, 3).map((p) => (
							<Link
								className={styles.courseLink}
								key={p._id}
								href={`/courses/${p.alias}`}
							>
								{p.title}
							</Link>
						))}
				</div>
				<Divider />
				<Button onClick={() => setIsFullOpened(!isFullOpened)}>
					Открыть все курсы
				</Button>
			</Card>
		</div>
	);
};
