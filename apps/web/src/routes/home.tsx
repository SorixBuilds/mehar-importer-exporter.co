import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { SITE, PRODUCTS } from '@/data/site';
import { Hero } from '@/components/home/hero';
import { TrustStrip } from '@/components/home/trust-strip';
import { Products } from '@/components/home/products';
import { Packaging } from '@/components/home/packaging';
import { About } from '@/components/home/about';
import { HowWeWork } from '@/components/home/how-we-work';
import { Markets } from '@/components/home/markets';
import { Contact } from '@/components/home/contact';
import hero768 from '@/assets/hero-port-768.webp?url';
import hero1280 from '@/assets/hero-port-1280.webp?url';
import hero1672 from '@/assets/hero-port-1672.webp?url';

export const links: Route.LinksFunction = () => [
	{
		rel: 'preload',
		as: 'image',
		href: hero1280,
		imageSrcSet: `${hero768} 768w, ${hero1280} 1280w, ${hero1672} 1672w`,
		imageSizes: '100vw',
		fetchPriority: 'high',
	},
];

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Mehar Importer & Exporter Co. | Fresh Produce Exporter, Pakistan',
		description: 'Quetta-based exporter of fresh onions, potatoes, garlic, ginger, okra, mangoes, oranges and grapes. Wholesale and export quotations on WhatsApp.',
		image: '/og-cover.jpg',
		jsonLd: [
			{
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: SITE.name,
				url: SITE.origin,
				logo: `${SITE.origin}/apple-touch-icon.png`,
				email: SITE.email,
				telephone: SITE.landlineDisplay,
				founder: { '@type': 'Person', name: SITE.owner },
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'Office No. 12, Hussain Center, Sarai Namak, Alamdar Road',
					addressLocality: SITE.city,
					addressRegion: SITE.region,
					addressCountry: 'PK',
				},
				areaServed: SITE.markets,
			},
			{
				'@context': 'https://schema.org',
				'@type': 'ItemList',
				name: 'Mehar produce',
				itemListElement: PRODUCTS.map((p, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					item: { '@type': 'Product', name: p.name, category: 'Fresh produce', brand: SITE.name },
				})),
			},
		],
	});
}

export default function Home() {
	return (
		<main id="main">
			<Hero />
			<TrustStrip />
			<Products />
			<Packaging />
			<About />
			<HowWeWork />
			<Markets />
			<Contact />
		</main>
	);
}
