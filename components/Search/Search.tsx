import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import LoopIcon from './loop.svg';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps) => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<div {...props} className={cn(className, styles.search)}>
			<Input
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Поиск..."
				onKeyDown={handleKeyDown}
			/>
			<Button className={styles.button} onClick={goToSearch}>
				<LoopIcon />
			</Button>
		</div>
	);
};
