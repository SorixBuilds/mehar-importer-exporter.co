// Single source of truth for Mehar Importer & Exporter Co.
// All business facts verified against the owner's business card (Oct 2026).
// Never add certifications, export volumes, years in business, or proven
// customers here — none have been verified.

export const SITE = {
	name: 'Mehar Importer & Exporter Co.',
	shortName: 'Mehar',
	tagline: 'Your Trusted Export Partner',
	owner: 'Zaheer Abbas',
	// Public origin used for canonical URLs, Open Graph and sitemap.
	origin: 'https://mehar-importer-exporter-co.com',
	// Contact (verified on the business card).
	whatsapp: '923138396554',
	phoneDisplay: '+92 313 8396554',
	landlineDisplay: '+92 81 2080958',
	landlineTel: '+92812080958',
	email: 'mehar.zaheer403@gmail.com',
	address: 'Office No. 12, Hussain Center, Sarai Namak, Alamdar Road, Quetta, Balochistan, Pakistan',
	city: 'Quetta',
	region: 'Balochistan',
	country: 'Pakistan',
	// Intended / target markets — NOT proven customers or completed shipments.
	markets: ['UAE', 'United Kingdom', 'Europe', 'Malaysia', 'Indonesia'],
} as const;

/** Builds a WhatsApp deep link with an optional prefilled, product-specific message. */
export function whatsapp(product?: string): string {
	const message = product
		? `Hello Mehar, I would like a quote for ${product}. Please share availability, grade, packing and current pricing.`
		: 'Hello Mehar, I would like to make a wholesale / export enquiry. Please share availability and a quotation.';
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Product = {
	slug: string;
	name: string;
	/** Short label shown under the name, e.g. botanical / market note. */
	kind: string;
	blurb: string;
	/** Base filename stem in src/assets, resolved via the asset() helper. */
	image: string;
	alt: string;
};

// The nine products confirmed with the owner. Descriptions are generic B2B
// handling notes — no fabricated grades, sizes or seasons.
export const PRODUCTS: Product[] = [
	{
		slug: 'red-onions',
		name: 'Red Onions',
		kind: 'Fresh bulbs',
		blurb: 'Firm, deep-red bulbs with strong colour and good shelf life — graded by size and mesh- or carton-packed for wholesale and export.',
		image: 'product-red-onions',
		alt: 'Fresh red onions in a wooden export crate',
	},
	{
		slug: 'white-onions',
		name: 'White Onions',
		kind: 'Fresh bulbs',
		blurb: 'Clean, pungent white onions sorted by size for processing, catering and distribution buyers.',
		image: 'product-white-onions',
		alt: 'Fresh white onions',
	},
	{
		slug: 'potatoes',
		name: 'Potatoes',
		kind: 'Fresh tubers',
		blurb: 'Table and processing-grade potatoes, sized and sacked for bulk wholesale and container loads.',
		image: 'product-potatoes',
		alt: 'Fresh potatoes',
	},
	{
		slug: 'garlic',
		name: 'Garlic',
		kind: 'Fresh bulbs',
		blurb: 'Tight, well-cured garlic bulbs with firm cloves, suited to wholesale kitchens and re-export.',
		image: 'product-garlic',
		alt: 'Fresh garlic bulbs',
	},
	{
		slug: 'ginger',
		name: 'Ginger',
		kind: 'Fresh rhizome',
		blurb: 'Aromatic mature ginger, cleaned and packed for fresh trade and distribution.',
		image: 'product-ginger',
		alt: 'Fresh ginger root',
	},
	{
		slug: 'okra',
		name: 'Lady Finger (Okra)',
		kind: 'Fresh vegetable',
		blurb: 'Tender, hand-picked green okra, graded for freshness and packed for quick dispatch.',
		image: 'product-okra',
		alt: 'Fresh green okra (lady finger)',
	},
	{
		slug: 'mangoes',
		name: 'Mangoes',
		kind: 'Seasonal fruit',
		blurb: 'Seasonal Pakistani mangoes selected for aroma and ripeness, packed for careful transit.',
		image: 'product-mangoes',
		alt: 'Ripe mangoes',
	},
	{
		slug: 'oranges',
		name: 'Oranges (Kinnow)',
		kind: 'Citrus fruit',
		blurb: 'Juicy Pakistani kinnow and oranges, size-graded and carton-packed for citrus-season export.',
		image: 'product-oranges',
		alt: 'Fresh oranges in export cartons',
	},
	{
		slug: 'grapes',
		name: 'Grapes',
		kind: 'Seasonal fruit',
		blurb: 'Fresh seasonal grapes, cluster-selected and packed to protect condition in transit.',
		image: 'product-grapes',
		alt: 'Fresh green grapes',
	},
];

// Branded export packaging the owner supplied, shown to demonstrate pack formats.
export const PACKAGING = [
	{ image: 'pack-red-onions', alt: 'Mehar-branded 25 kg carton and mesh sack of red onions' },
	{ image: 'pack-kinnow', alt: 'Mehar-branded 10 kg carton and mesh sack of kinnow mandarins' },
	{ image: 'pack-potato', alt: 'Mehar-branded carton of potatoes' },
	{ image: 'pack-ginger', alt: 'Mehar-branded packaging for ginger' },
	{ image: 'pack-mango', alt: 'Mehar-branded carton of mangoes' },
	{ image: 'pack-okra', alt: 'Mehar-branded packaging for okra' },
] as const;
