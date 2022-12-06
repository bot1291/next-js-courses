import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// wrap in the ref to be able to get value from teaxtarea by using react-hook-form

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
				{error && (		// drop error which we get from react-hook-form if get it
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);

// wrapped in the ref component should has displayName for react devtools

TextArea.displayName = 'TextArea';
