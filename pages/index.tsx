import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Input, TextArea } from '../components/';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(0);
	return (
		<>
			<Htag tag="h1">Htag</Htag>
			<Button arrow="right">Узнать подробнее</Button>
			<Button arrow="down" appearance="ghost">
				Узнать подробнее
			</Button>
			<P size="l">Large</P>
			<P size="s">Small</P>
			<P>Medium</P>
			<Tag color="red">hh.ru</Tag>
			<Tag size="s" color="ghost">
				Ghost
			</Tag>
			<Tag color="green">Green</Tag>
			<Tag size="s" color="primary">
				Primary
			</Tag>
			<Rating rating={rating} isEditable setRating={setRating}></Rating>
			<Rating rating={3}></Rating>
			<Input placeholder="Имя" />
			<TextArea placeholder="" />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;

	const menu: MenuItem[] = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({ firstCategory }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.catch((e: Error) => {
			console.log(e.message);
		});
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

export interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
