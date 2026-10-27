import { MapPin, PackageCheck, MessageSquareText, Globe2 } from 'lucide-react';

const ITEMS = [
	{ icon: MapPin, title: 'Quetta-based', sub: 'Trading from Balochistan, Pakistan' },
	{ icon: PackageCheck, title: 'Export-grade handling', sub: 'Graded, sorted and packed to order' },
	{ icon: MessageSquareText, title: 'Quotation-led', sub: 'Product-specific quotes on WhatsApp' },
	{ icon: Globe2, title: 'Worldwide enquiries', sub: 'Buyers across our intended markets' },
];

export function TrustStrip() {
	return (
		<section className="trust" aria-label="Why Mehar">
			<div className="trust-inner">
				{ITEMS.map(({ icon: Icon, title, sub }) => (
					<div className="trust-item" key={title}>
						<Icon aria-hidden="true" />
						<div>
							<strong>{title}</strong>
							<small>{sub}</small>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
