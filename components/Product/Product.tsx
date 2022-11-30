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
import { useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = ({ product, className, ...props }: ProductProps) => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		<>
			<Card className={cn(className, styles.product)}>
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
				<div className={styles.rateTitle}>
					{product.reviewCount}{' '}
					{decOfNum(product.reviewCount, [
						'отзыв',
						'отзыва',
						'отзывов',
					])}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map((c) => (
						<div className={styles.characteristics} key={c.name}>
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
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}
					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button>Узнать подробнее</Button>
					{!!product.reviews.length && (
						<Button
							onClick={() => setIsReviewOpened(!isReviewOpened)}
							arrow={isReviewOpened ? 'down' : 'right'}
							appearance="ghost"
						>
							Читать отзывы
						</Button>
					)}
				</div>
			</Card>
			<Card
				color="blue"
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
			>
				{product.reviews.map((r) => (
					<>
						<Review key={r._id} review={r} />
						<Divider />
					</>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</>
	);
};
