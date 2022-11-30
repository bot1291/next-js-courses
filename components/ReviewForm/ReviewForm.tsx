import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { useState } from 'react';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CrossIcon from './cross.svg';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps) => {
	const [rate, setRate] = useState<number>(0);
	const [success, setSucces] = useState<boolean>(true);

	return (
		<>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input placeholder="Имя" />
				<Input
					className={styles.titleReview}
					placeholder="Заголовок отзыва"
				/>
				<div className={styles.rating}>
					<span>
						Оценка:
						<Rating isEditable setRating={setRate} rating={rate} />
					</span>
				</div>
				<TextArea
					className={styles.textarea}
					placeholder="Текст отзыва"
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.moderation}>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<CrossIcon className={styles.cross} />
				<div className={styles.successText}>
					Спасибо, Ваш отзыв будет опубликован после проверки.
				</div>
			</div>
		</>
	);
};
