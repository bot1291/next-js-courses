import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(
	(
		{ children, color = 'white', className, ...props }: CardProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div
				ref={ref}
				className={cn(styles.card, className, {
					[styles.blue]: color === 'blue',
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
);

// wrapped in the ref component should has displayName for react devtools

Card.displayName = 'Card';
