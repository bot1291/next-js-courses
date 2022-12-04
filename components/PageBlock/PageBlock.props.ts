import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PageItem } from '../../interfaces/menu.interface';

export interface PageBlockProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	page: PageItem;
}
