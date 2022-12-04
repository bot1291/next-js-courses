import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { MenuItem } from '../../interfaces/menu.interface';

export interface CourseBlockProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menu: MenuItem;
}
