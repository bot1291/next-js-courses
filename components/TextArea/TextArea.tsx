import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(
	(
		{ error, className, ...props }: TextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cn(className, styles.textareaWrapper)}>
				<textarea
					ref={ref}
					{...props}
					className={cn(styles.textarea, {
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

TextArea.displayName = 'TextArea';
