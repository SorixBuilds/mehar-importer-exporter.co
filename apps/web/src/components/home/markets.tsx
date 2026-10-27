import { Globe2 } from 'lucide-react';
import { SITE } from '@/data/site';
import { Reveal } from '@/components/reveal';

// Abstract hub-and-spoke routes from Quetta to the intended markets. Positions
// are stylised, not a geographic map — clearly labelled as intended, not proven.
const DESTS = [
	{ label: 'UK', x: 150, y: 96 },
	{ label: 'Europe', x: 210, y: 120 },
	{ label: 'UAE', x: 300, y: 232 },
	{ label: 'Malaysia', x: 430, y: 236 },
	{ label: 'Indonesia', x: 452, y: 286 },
];
const HUB = { x: 272, y: 196 };

function curve(x1: number, y1: number, x2: number, y2: number) {
	const mx = (x1 + x2) / 2;
	const my = Math.min(y1, y2) - 42;
	return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function Markets() {
	return (
		<section className="section markets" id="markets">
			<div className="markets-grid">
				<Reveal>
					<span className="kicker">Markets</span>
					<h2 className="section-title">Building toward buyers worldwide</h2>
					<p className="section-lead">
						We welcome wholesale and import enquiries from these regions. They are the
						markets we are actively building toward.
					</p>
					<ul className="market-list" aria-label="Intended markets">
						{SITE.markets.map(m => (
							<li className="market-chip" key={m}><Globe2 size={15} /> {m}</li>
						))}
					</ul>
					<p className="markets-note">
						<strong>Intended markets.</strong> These regions reflect where we aim to
						trade and welcome enquiries — not a claim of completed shipments or existing
						overseas customers.
					</p>
				</Reveal>

				<Reveal delay={0.08}>
					<svg className="trade-map" viewBox="0 0 520 360" role="img" aria-label="Map showing intended trade routes from Quetta, Pakistan to the UK, Europe, UAE, Malaysia and Indonesia">
						<circle cx="260" cy="190" r="150" className="land" opacity="0.5" />
						<g stroke="#cdd8cd" strokeWidth="0.6" fill="none" opacity="0.7">
							<ellipse cx="260" cy="190" rx="150" ry="60" />
							<ellipse cx="260" cy="190" rx="90" ry="150" />
							<line x1="110" y1="190" x2="410" y2="190" />
						</g>
						{DESTS.map(d => (
							<path key={d.label} className="route" d={curve(HUB.x, HUB.y, d.x, d.y)} />
						))}
						{DESTS.map(d => (
							<g key={d.label}>
								<circle className="dot" cx={d.x} cy={d.y} r="4" />
								<text className="maplabel" x={d.x} y={d.y - 9} textAnchor="middle">{d.label}</text>
							</g>
						))}
						<circle className="hub" cx={HUB.x} cy={HUB.y} r="6.5" />
						<text className="maplabel" x={HUB.x} y={HUB.y + 20} textAnchor="middle" style={{ fontWeight: 700, fill: 'var(--green)' }}>Quetta</text>
					</svg>
				</Reveal>
			</div>
		</section>
	);
}
