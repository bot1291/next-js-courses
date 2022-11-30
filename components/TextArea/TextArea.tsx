import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';

export const TextArea = ({ className, ...props }: TextAreaProps) => {
	return <textarea {...props} className={cn(className, styles.inputArea)} />;
};
