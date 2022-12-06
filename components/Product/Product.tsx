import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import Image from 'next/image';
import { Htag } from '../Htag/Htag';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { decOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

// component about all things of current product

const ProductRef = forwardRef(
	(
		{ product, className, ...props }: ProductProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
		const reviewRef = useRef<HTMLButtonElement>(null);

		const variants = {
			visible: {
				opacity: 1,
				height: 'auto',
				display: 'grid',
			},
			hidden: {
				opacity: 0,
				height: 0,
				transitionEnd: { display: 'none' },
			},
		};

		const scrollToReview = () => {
			setTimeout(() => {
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 50);
			product.reviews.length && setIsReviewOpened(true);
			reviewRef.current?.focus();
		};

		return (
			<div ref={ref} className={className} {...props}>
				<Card className={cn(styles.product)}>
					<div className={styles.logo}>
						<Image
							width="70"
							height="70"
							src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
							alt={product.title}
						/>
					</div>
					<Htag className={styles.title} tag="h3">
						{product.title}
					</Htag>
					<div className={styles.price}>
						{priceRu(product.price)}
						{product.oldPrice && (
							<Tag className={styles.discount} color="green">
								{priceRu(product.price - product.oldPrice)}
							</Tag>
						)}
					</div>
					<div className={styles.credit}>
						{priceRu(product.credit)}/
						<span className={styles.month}>мес</span>
					</div>
					<div className={styles.rating}>
						<Rating rating={product.initialRating} />
					</div>
					<div className={styles.tags}>
						{product.categories.map((c) => (
							<Tag className={styles.tag} color="ghost" key={c}>
								{c}
							</Tag>
						))}
					</div>
					<div className={styles.priceTitle}>цена</div>
					<div className={styles.creditTitle}>в кредит</div>
					<div
						className={cn(styles.rateTitle, {
							[styles.rateTitleColor]: product.reviews.length,
						})}
					>
						<a
							href="#ref"
							onClick={
								product.reviews.length
									? scrollToReview
									: undefined
							}
						>
							<span className={styles.rateCount}>
								{product.reviewCount}
							</span>
							{decOfNum(product.reviewCount, [
								'отзыв',
								'отзыва',
								'отзывов',
							])}
						</a>
					</div>
					<Divider className={styles.hr} />
					<div className={styles.description}>
						{product.description}
					</div>
					<div className={styles.feature}>
						{product.characteristics.map((c) => (
							<div
								className={styles.characteristics}
								key={c.name}
							>
								<span className={styles.characteristicsName}>
									{c.name}
								</span>
								<span className={styles.dots}></span>
								<span className={styles.characteristicsValue}>
									{c.value}
								</span>
							</div>
						))}
					</div>
					<div className={styles.advBlock}>
						{product.advantages && (
							<div className={styles.advantages}>
								<div className={styles.advTitle}>
									Преимущества
								</div>
								<div>{product.advantages}</div>
							</div>
						)}
						{product.disadvantages && (
							<div className={styles.disadvantages}>
								<div className={styles.advTitle}>
									Недостатки
								</div>
								<div>{product.disadvantages}</div>
							</div>
						)}
					</div>
					<Divider className={cn(styles.hr, styles.hr2)} />
					<div className={styles.actions}>
						<Button>Узнать подробнее</Button>
						<Button
							ref={reviewRef}
							onClick={() => setIsReviewOpened(!isReviewOpened)}
							arrow={isReviewOpened ? 'down' : 'right'}
							appearance="ghost"
						>
							{product.reviews.length
								? 'Читать отзывы'
								: 'Оставить первый отзыв'}
						</Button>
					</div>
				</Card>
				<motion.div
					variants={variants}
					initial="hidden"
					animate={isReviewOpened ? 'visible' : 'hidden'}
				>
					<Card color="blue" className={cn(styles.reviews)}>
						{product.reviews.map((r) => (
							<div key={r._id}>
								<Review review={r} />
								<Divider />
							</div>
						))}
						<ReviewForm productId={product._id} />
					</Card>
				</motion.div>
			</div>
		);
	}
);

// wrapped in the ref component should has displayName for react devtools

ProductRef.displayName = 'Product';

// also wrap in the motion to give control to the framer motion to be able to set any motions

export const Product = motion(ProductRef);
