import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
	(
		{ error, className, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<>
				<div className={styles.inputWrapper}>
					<input
						ref={ref}
						{...props}
						className={cn(className, styles.input, {
							[styles.error]: error,
						})}
					/>
					{error && <span className={styles.errorMessage}>{error.message}</span>}
				</div>
			</>
		);
	}
);

Input.displayName = 'Input';
