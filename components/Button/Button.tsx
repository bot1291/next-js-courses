import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Button = forwardRef(
	(
		{
			appearance = 'primary',
			arrow = 'none',
			children,
			className,
			...props
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>
	): JSX.Element => {
		return (
			<motion.button
				whileHover={{ scale: 1.05 }}
				className={cn(styles.button, className, {
					[styles.primary]: appearance === 'primary',
					[styles.ghost]: appearance === 'ghost',
				})}
				{...props}
				ref={ref}
			>
				{children}
				{arrow !== 'none' && (
					<span
						className={cn(styles.arrow, {
							[styles.down]: arrow === 'down',
						})}
					>
						<ArrowIcon />
					</span>
				)}
			</motion.button>
		);
	}
);

Button.displayName = 'Button';
