import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

export const Input = forwardRef(({ className, ...props }: InputProps) => {
	return <input {...props} className={cn(className, styles.input)} />;
});
