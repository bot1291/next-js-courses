import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ForwardedRef, forwardRef } from 'react';

// rating component can be editable or not
// to editable component we can set rating by myself
// wrap in the ref to be able to get value from state by using react-hook-form

export const Rating = forwardRef(
	(
		{
			error,
			rating,
			isEditable = false,
			setRating,
			className,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {

		// set explicit count of rating

		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);	
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		const computeFocus = (rate: number, index: number): number => {
			if (!isEditable) {
				return -1;
			}
			if (!rating && index === 0) {
				return 0;
			}
			if (rate === index + 1) {
				return 0;
			}
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map(
				(_rate: JSX.Element, index: number) => {
					return (
						<span
							onMouseEnter={() => changeDisplay(index + 1)} // when we move mouse on the star it becomes rerender count of painted stars
							onMouseLeave={() => changeDisplay(rating)}
							onClick={() => onclick(index + 1)}
							className={cn(styles.star, {

								// count of painted stars depends on how much rating we set 
								// and then matched with current star index

								[styles.filled]: index < currentRating,
								[styles.editable]: isEditable,
							})}

							// these all set for correct tabulation through stars

							key={index}
							tabIndex={computeFocus(rating, index)}
							onKeyDown={handleKey}
							ref={(r) => ratingArrayRef.current?.push(r)}
						>
							<StarIcon />
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


		// set handler to be able to using tabulation through arrows on keyboard 

		const handleKey = (key: KeyboardEvent<HTMLDivElement>) => {
			if (!isEditable || !setRating) {
				return;
			}
			if (rating === undefined) {
				setRating(1);
			}
			key.preventDefault();
			if (key.code === 'ArrowRight' || key.code === 'ArrowUp') {
				rating < 5 && setRating(rating + 1);
				ratingArrayRef.current[rating]?.focus();
			}
			if (key.code === 'ArrowLeft' || key.code === 'ArrowDown') {
				rating > 0 && setRating(rating - 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		useEffect(() => {
			constructRating(rating);
		}, [rating]);

		return (
			<div
				ref={ref}
				className={cn(className, styles.ratingWrapper, {
					[styles.isError]: error,
				})}
				{...props}
			>
				{ratingArray.map((rate, index) => (
					<span key={index}>{rate}</span>
				))}
				{error && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);

// wrapped in the ref component should has displayName for react devtools

Rating.displayName = 'Rating';
