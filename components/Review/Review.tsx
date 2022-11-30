import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import cn from 'classnames';
import UserIcon from './user.svg';
import { Rating } from '../Rating/Rating';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Review = ({ review, className, ...props }: ReviewProps) => {
	return (
		<div className={cn(className, styles.review)} {...props}>
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{review.name}:</span>
				<span>{review.title}</span>
			</div>
			<div className={styles.date}>
				<span>
					{format(new Date(review.createdAt), 'dd MMMM yyyy', {
						locale: ru,
					})}
				</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={review.rating} />
			</div>
			<div className={styles.description}>{review.description}</div>
		</div>
	);
};
