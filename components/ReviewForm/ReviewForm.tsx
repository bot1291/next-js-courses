import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CrossIcon from './cross.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<IReviewForm>();
	const [isClosed, setIsClosed] = useState<boolean>(true);
	const [isSuccess, setIsSuccesst] = useState<boolean>(false);
	const [isFailed, setIsFailed] = useState<string>('');

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			);
			if (data.message) {
				setIsSuccesst(true);
				reset();
			} else {
				setIsFailed('Что-то пошло не так');
				console.log('Что-то пошло не так');
			}
			console.log(data);
		} catch (error) {
			if (error instanceof Error) {
				setIsFailed(error.message);
				console.log(error.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input
					error={errors.name}
					{...register('name', {
						required: { value: true, message: 'Заполните имя' },
					})}
					placeholder="Имя"
				/>
				<Input
					error={errors.title}
					{...register('title', {
						required: {
							value: true,
							message: 'Напишите заголовок',
						},
					})}
					className={styles.titleReview}
					placeholder="Заголовок отзыва"
				/>
				<div className={styles.rating}>
					<span>
						Оценка:
						<Controller
							name="rating"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Поставьте оценку',
								},
							}}
							render={({ field, formState: { errors } }) => (
								<Rating
									error={errors.rating}
									isEditable
									setRating={field.onChange}
									ref={field.ref}
									rating={field.value}
								/>
							)}
						/>
					</span>
				</div>
				<TextArea
					error={errors.description}
					{...register('description', {
						required: {
							value: true,
							message: 'Введите текст отзыва',
						},
					})}
					className={styles.textarea}
					placeholder="Текст отзыва"
				/>
				<div className={styles.submit}>
					<Button
						onClick={() => setIsClosed(!isSuccess && !isValid)}
						disabled={isSuccess}
						className={styles.button}
						appearance="primary"
					>
						Отправить
					</Button>
					<span className={styles.moderation}>
						Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			<div
				className={cn(styles.success, {
					[styles.closed]: !isSuccess || isClosed,
				})}
			>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<span
					tabIndex={0}
					onKeyDown={(key: KeyboardEvent<HTMLSpanElement>) =>
						key.code === 'Enter' && setIsClosed(true)
					}
					onClick={() => setIsClosed(true)}
					className={styles.cross}
				>
					<CrossIcon />
				</span>
				<div className={styles.successText}>
					Спасибо, Ваш отзыв будет опубликован после проверки.
				</div>
			</div>
			<div
				className={cn(styles.failed, {
					[styles.closed]: !isFailed || isSuccess || isClosed,
				})}
			>
				<div className={styles.failedTitle}>Произошла ошибка</div>
				<span
					tabIndex={0}
					onKeyDown={(key: KeyboardEvent<HTMLSpanElement>) =>
						key.code === 'Enter' && setIsClosed(true)
					}
					onClick={() => setIsClosed(true)}
					className={styles.cross}
				>
					<CrossIcon className={styles.closeFailed} />
				</span>
				<div className={styles.failedText}>
					Попробуйте обновить страницу
				</div>
			</div>
		</form>
	);
};
