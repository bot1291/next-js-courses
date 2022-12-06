// all api paths in one place to change them easily

 export const API = {
	topPage: {
		find: `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
		byAlias: {
			alias: (params: string | string[] | undefined) =>
				`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params}`,
		},
	},
	product: {
		find: `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
	},
	review: {
		createDemo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/review/create-demo`,
	},
};
