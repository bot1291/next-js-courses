import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// wrap in the ref to be able to get value from input by using react-hook-form

export const Input = forwardRef(
	(
		{ error, className, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(className, styles.inputWrapper)}>
				<input
					ref={ref}
					{...props}
					className={cn(styles.input, {
						[styles.error]: error,
					})}
				/>
				{error && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);

// wrapped in the ref component should has displayName for react devtools

Input.displayName = 'Input';
