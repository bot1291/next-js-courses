import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { KeyboardEvent, useEffect, useState } from 'react';

export const Rating = ({
	rating,
	isEditable = false,
	setRating,
	className,
	...props
}: RatingProps) => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
		new Array(5).fill(<></>)
	);
	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map(
			(_rate: JSX.Element, index: number) => {
				return (
					<span
						onMouseEnter={() => changeDisplay(index + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onclick(index + 1)}
						className={cn(styles.star, {
							[styles.filled]: index < currentRating,
							[styles.editable]: isEditable,
						})}
						key={index}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : undefined}
							onKeyDown={(e: KeyboardEvent<SVGElement>) =>
								isEditable && handleSpace(index + 1, e)
							}
						/>
					</span>
				);
			}
		);
		setRatingArray(updatedArray);
	};

	const changeDisplay = (rate: number) => {
		if (isEditable) {
			constructRating(rate);
		}
	};

	const onclick = (rate: number) => {
		if (isEditable && setRating) {
			setRating(rate);
		}
	};

	const handleSpace = (rate: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code === 'Space' && setRating) {
			setRating(rate);
		}
	};

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	return (
		<div className={className} {...props}>
			{ratingArray.map((rate, index) => (
				<span key={index}>{rate}</span>
			))}
		</div>
	);
};
