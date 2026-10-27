import { asset, srcset } from '@/lib/assets';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/reveal';

const FACILITIES = [
	{ image: 'facility-packing', caption: 'Grading & sorting' },
	{ image: 'facility-inspection', caption: 'Quality inspection' },
	{ image: 'facility-loading', caption: 'Container loading' },
];

export function About() {
	return (
		<section className="section about" id="about">
			<div className="about-grid">
				<Reveal className="about-media">
					<img
						src={asset('about-owner-1000.webp')}
						srcSet={srcset('about-owner', [560, 1000])}
						sizes="(max-width: 860px) 100vw, 50vw"
						width={1000}
						height={667}
						alt={`${SITE.owner}, founder of ${SITE.name}`}
						loading="lazy"
						decoding="async"
					/>
					<div className="about-badge">
						<strong>{SITE.owner}</strong>
						<small>FOUNDER</small>
					</div>
				</Reveal>

				<Reveal className="about-copy" delay={0.08}>
					<span className="kicker">Who We Are</span>
					<h2 className="section-title">Rooted in Quetta, open to your market</h2>
					<p>
						<strong>{SITE.name}</strong> is an agricultural produce trading business
						based in Quetta, Balochistan, founded by {SITE.owner}. We bring together
						fresh fruit and vegetables from Pakistani growers and markets, and prepare
						them for wholesale and export buyers.
					</p>
					<p>
						Our work is quotation-led, not retail. Tell us the produce you need, your
						quantity, preferred packing, destination and timing — and we&rsquo;ll
						confirm specifications, sourcing and availability for that specific
						requirement.
					</p>
					<p>
						We keep our claims honest: certifications, export volumes and trade history
						are confirmed individually as a relationship develops, never overstated.
						Photographs on this site are illustrative of the produce and handling we deal in.
					</p>
				</Reveal>
			</div>

			<div className="facility-row">
				{FACILITIES.map((f, i) => (
					<Reveal as="article" className="facility-card" key={f.image} delay={i * 0.06}>
						<img
							src={asset(`${f.image}-700.webp`)}
							srcSet={srcset(f.image, [360, 700])}
							sizes="(max-width: 560px) 100vw, 33vw"
							width={700}
							height={f.image === 'facility-packing' ? 394 : 525}
							alt={f.caption}
							loading="lazy"
							decoding="async"
						/>
						<figcaption>{f.caption}</figcaption>
					</Reveal>
				))}
			</div>
		</section>
	);
}
