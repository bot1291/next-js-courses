import { AdventagesProps } from './Adventages.props';
import styles from './Adventages.module.css';
import check from './check.png';
import Image from 'next/image';

export const Adventages = ({ advantages }: AdventagesProps) => {
	return (
		<>
			{advantages.map((a) => (
				<div key={a._id} className={styles.advantage}>
					<Image src={check} alt="Check icon" />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline} />
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};
