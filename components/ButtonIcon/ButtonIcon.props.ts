import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cross from './cross.svg';
import up from './up.svg';
import hamb from './hamb.svg';

export const icons = {
	up,
	cross,
	hamb,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearance: 'primary' | 'white';
	icon: IconName;
}
