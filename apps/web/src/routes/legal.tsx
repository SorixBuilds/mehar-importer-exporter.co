import { useLocation } from 'react-router';
import type { Route } from './+types/legal';
import { seo } from '@/lib/seo';
import { SITE } from '@/data/site';

type LegalPage = { title: string; intro: string; sections: { h: string; p: string[] }[] };

const LEGAL: Record<string, LegalPage> = {
	'/privacy-policy': {
		title: 'Privacy Policy',
		intro: `This policy explains how ${SITE.name} handles the information you share through this website. It may be updated as our processes develop.`,
		sections: [
			{ h: 'Information we collect', p: [
				'When you send an enquiry we collect the details you provide: your name, email address, and optionally your phone number, company, destination country, the produce and quantity you need, and your message.',
				'This website does not sell products online and does not ask for card or payment details.',
			] },
			{ h: 'How we use your information', p: [
				'We use your enquiry only to understand your requirement, reply to you, and discuss a quotation. We do not treat an enquiry as permission for unrelated marketing.',
			] },
			{ h: 'Storage and third parties', p: [
				'Enquiries are delivered to our business email through our website host. If you contact us on WhatsApp, that conversation is handled by WhatsApp under its own privacy terms.',
				'We keep enquiry information only as long as needed to respond and maintain our business records.',
			] },
			{ h: 'Your choices and contact', p: [
				`To ask about, correct, or delete your enquiry information, contact us on WhatsApp at ${SITE.phoneDisplay} or by email at ${SITE.email}.`,
			] },
		],
	},
	'/terms-and-conditions': {
		title: 'Terms & Conditions',
		intro: 'These terms cover the use of this website and the enquiry process. A listing or an enquiry does not by itself create a confirmed order.',
		sections: [
			{ h: 'Catalogue and quotations', p: [
				'Product descriptions and photographs on this site are illustrative. Grade, size, variety, origin, packing, availability and price are confirmed individually in a written quotation.',
			] },
			{ h: 'Enquiries and orders', p: [
				'Submitting an enquiry starts a discussion; it does not place an order or guarantee availability. An order exists only once specifications, quantity, price, packing, delivery and payment are agreed in writing.',
			] },
			{ h: 'Fresh and perishable goods', p: [
				'Natural variation in size, colour and appearance is normal for fresh produce, within the specifications agreed for each order. Buyers should inspect produce promptly on delivery.',
			] },
			{ h: 'Claims and honesty of information', p: [
				'We do not claim certifications, export volumes or a trade history that has not been verified. Any such details are confirmed individually. Please base decisions on the written information we provide for your specific enquiry.',
			] },
			{ h: 'Contact', p: [
				`For any question about these terms, contact ${SITE.name} on WhatsApp at ${SITE.phoneDisplay} or by email at ${SITE.email}.`,
			] },
		],
	},
};

function pageFor(pathname: string): LegalPage {
	return LEGAL[pathname] ?? LEGAL['/privacy-policy'];
}

export function meta({ matches, location }: Route.MetaArgs) {
	const page = pageFor(location.pathname);
	return seo({ matches, location }, {
		title: `${page.title} | ${SITE.name}`,
		description: page.intro.slice(0, 155),
		noindex: false,
	});
}

export default function Legal() {
	const { pathname } = useLocation();
	const page = pageFor(pathname);
	return (
		<main id="main">
			<div className="page-banner">
				<div className="page-banner-inner">
					<span className="kicker">Legal</span>
					<h1>{page.title}</h1>
					<p>{page.intro}</p>
				</div>
			</div>
			<div className="section legal">
				{page.sections.map(s => (
					<section className="legal-block" key={s.h}>
						<h2>{s.h}</h2>
						{s.p.map((para, i) => <p key={i}>{para}</p>)}
					</section>
				))}
			</div>
		</main>
	);
}
