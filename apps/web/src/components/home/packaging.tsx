import { PACKAGING } from '@/data/site';
import { asset, srcset } from '@/lib/assets';
import { Reveal } from '@/components/reveal';

export function Packaging() {
	return (
		<section className="section packaging tight" id="packaging">
			<div className="section-head">
				<span className="kicker">Export Packaging</span>
				<h2 className="section-title">Branded, labelled and ready to ship</h2>
				<p className="section-lead">
					Produce is packed in mesh sacks and cartons marked &ldquo;Product of
					Pakistan&rdquo;, with net weights and handling marks. Pack formats and sizes
					are agreed per order.
				</p>
			</div>
			<div className="pack-grid">
				{PACKAGING.map((pack, i) => (
					<Reveal className="pack-card" key={pack.image} delay={(i % 6) * 0.04}>
						<img
							src={asset(`${pack.image}-360.webp`)}
							srcSet={srcset(pack.image, [360, 700])}
							sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 16vw"
							width={360}
							height={360}
							alt={pack.alt}
							loading="lazy"
							decoding="async"
						/>
					</Reveal>
				))}
			</div>
		</section>
	);
}
