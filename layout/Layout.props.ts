import { ReactNode } from 'react';

// dont set DetailedHTMLProps to component because we use
// this component only in one place and dont need acces to any different properties 
// only these one that we set

export interface LayoutProps {
	children: ReactNode;
}
