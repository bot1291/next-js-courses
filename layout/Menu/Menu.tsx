import styles from './Menu.module.css';
import cn from 'classnames';
import { forwardRef, useContext, useEffect, KeyboardEvent } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = forwardRef(() => {
	const { setOpened, menuDefault, firstCategory, menu, setMenu } =
		useContext(AppContext);
	const router = useRouter();
	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'afterChildren',
				staggerChildren: 0.05,
			},
		},
		hidden: { marginBottom: 0 },
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
		},
		hidden: { opacity: 0, height: 0 },
	};

	useEffect(() => {
		if (menuDefault && setMenu) {
			setMenu(menuDefault);
		}
	}, [setMenu, menuDefault]);

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const openSecondLevelKey = (
		key: KeyboardEvent<HTMLDivElement>,
		secondCategory: string
	) => {
		if (key.code === 'Enter' || key.code === 'Space') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<Link href={`/${m.route}`} legacyBehavior>
							<a>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]:
											router.asPath !== '/' &&
											m.id === firstCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{router.asPath !== '/' &&
							m.id === firstCategory &&
							buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu &&
					menu.map((m) => {
						if (
							m.pages
								.map((p) => p.alias)
								.includes(router.asPath.split('/')[2])
						) {
							m.isOpened = true;
						}
						return (
							<div key={m._id.secondCategory}>
								<div
									tabIndex={0}
									onKeyDown={(
										key: KeyboardEvent<HTMLDivElement>
									) =>
										openSecondLevelKey(
											key,
											m._id.secondCategory
										)
									}
									onClick={() =>
										openSecondLevel(m._id.secondCategory)
									}
									className={styles.secondLevel}
								>
									{m._id.secondCategory}
								</div>
								<motion.div
									layout
									variants={variants}
									initial={m.isOpened ? 'visible' : 'hidden'}
									animate={m.isOpened ? 'visible' : 'hidden'}
									className={cn(styles.secondLevelBlock)}
								>
									{buildThirdLevel(
										m.pages,
										menuItem.route,
										m.isOpened
									)}
								</motion.div>
							</div>
						);
					})}
			</div>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean | undefined
	) => {
		return pages.map((p) => {
			return (
				<motion.div variants={variantsChildren} key={p.alias}>
					<Link href={`/${route}/${p.alias}`} legacyBehavior>
						<a
							tabIndex={isOpened ? 0 : -1}
							onClick={() => setOpened && setOpened(false)}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]:
									`/${route}/${p.alias}` === router.asPath ||
									`/${route}/${p.alias}#ref` ===
										router.asPath,
							})}
						>
							{p.category}
						</a>
					</Link>
				</motion.div>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
});

Menu.displayName = 'Menu';
