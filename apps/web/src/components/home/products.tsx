import { MessageCircle } from 'lucide-react';
import { PRODUCTS, whatsapp } from '@/data/site';
import { asset, srcset } from '@/lib/assets';
import { Reveal } from '@/components/reveal';

const SPEC_ROWS = ['Grade', 'Size', 'Packing', 'Season'];

export function Products() {
	return (
		<section className="section products" id="products">
			<div className="section-head">
				<span className="kicker">Our Produce</span>
				<h2 className="section-title">Fresh fruit &amp; vegetables, packed for trade</h2>
				<p className="section-lead">
					Nine core lines sourced for wholesale and export. Send a product-specific
					message on WhatsApp and we&rsquo;ll reply with availability, grade, packing
					options and current pricing.
				</p>
			</div>

			<div className="products-grid">
				{PRODUCTS.map((p, i) => (
					<Reveal as="article" className="product-card" key={p.slug} delay={(i % 3) * 0.06}>
						<div className="product-media">
							<img
								src={asset(`${p.image}-800.webp`)}
								srcSet={srcset(p.image, [400, 800])}
								sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
								width={800}
								height={600}
								alt={p.alt}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="product-body">
							<span className="product-kind">{p.kind}</span>
							<h3 className="product-name">{p.name}</h3>
							<p className="product-blurb">{p.blurb}</p>
							<dl className="spec-list">
								<div><dt>Origin</dt><dd>Pakistan</dd></div>
								{SPEC_ROWS.map(row => (
									<div key={row}><dt>{row}</dt><dd className="tbc">Confirmed on enquiry</dd></div>
								))}
							</dl>
							<div className="product-cta">
								<a className="button whatsapp" href={whatsapp(p.name)} target="_blank" rel="noopener noreferrer">
									<MessageCircle size={17} /> Quote for {p.name.replace(/\s*\(.*\)/, '')}
								</a>
							</div>
						</div>
					</Reveal>
				))}
			</div>

			<p className="products-note">
				<strong>Note:</strong> grades, sizes, packing and seasonal availability are
				confirmed per enquiry — we don&rsquo;t publish fixed specifications or claim
				stock we can&rsquo;t supply. Product images are illustrative.
			</p>
		</section>
	);
}
