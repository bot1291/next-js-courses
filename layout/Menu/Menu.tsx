import styles from './Menu.module.css';
import cn from 'classnames';
import { forwardRef, useContext, useEffect } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = forwardRef(() => {
	const { menuDefault, firstCategory, menu, setMenu } =
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
											m.id === firstCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
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
									{buildThirdLevel(m.pages, menuItem.route)}
								</motion.div>
							</div>
						);
					})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => {
			return (
				<motion.div variants={variantsChildren} key={p.alias}>
					<Link href={`/${route}/${p.alias}`} legacyBehavior>
						<a
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]:
									(`/${route}/${p.alias}` === router.asPath) ||
									(`/${route}/${p.alias}#ref` === router.asPath),
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