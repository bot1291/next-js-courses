import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CrossIcon from './cross.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps) => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input {...register('name')} placeholder="Имя" />
				<Input
					{...register('title')}
					className={styles.titleReview}
					placeholder="Заголовок отзыва"
				/>
				<div className={styles.rating}>
					<span>
						Оценка:
						<Controller
							name="rating"
							control={control}
							render={({ field }) => (
								<Rating
									isEditable
									setRating={field.onChange}
									rating={field.value}
								/>
							)}
						/>
					</span>
				</div>
				<TextArea
					{...register('description')}
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
		</form>
	);
};
