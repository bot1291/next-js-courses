import { useEffect, useState } from 'react';

// hook which sat y depend on howe much we scrolled

export const useScrollY = (): number => {
	const isBrowser = typeof window !== undefined;

	const [scroll, setScroll] = useState<number>(0);

	const handleScroll = () => {
		const currentScrollY = isBrowser ? window.scrollY : 0;
		setScroll(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return scroll;
};
