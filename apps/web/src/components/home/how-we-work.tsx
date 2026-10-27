import { Reveal } from '@/components/reveal';

const STEPS = [
	{ n: '01', title: 'Enquiry', text: 'Share the produce, quantity, preferred packing, destination and timing — on WhatsApp or the enquiry form.' },
	{ n: '02', title: 'Quotation', text: 'We confirm availability, grade, packing options and pricing for your requirement, subject to written confirmation.' },
	{ n: '03', title: 'Sampling', text: 'Where helpful, samples or specifications are agreed so you can verify quality before committing to a consignment.' },
	{ n: '04', title: 'Order & dispatch', text: 'On agreed terms, produce is sorted, packed and prepared for dispatch, with documentation discussed per destination.' },
];

export function HowWeWork() {
	return (
		<section className="section how" id="how-we-work">
			<div className="section-head">
				<span className="kicker">How We Work</span>
				<h2 className="section-title">A simple, honest enquiry process</h2>
				<p className="section-lead">
					Every order starts as a conversation. Nothing is committed until it&rsquo;s
					confirmed in writing — so you always know what you&rsquo;re agreeing to.
				</p>
			</div>
			<div className="steps">
				{STEPS.map((s, i) => (
					<Reveal as="div" className="step" key={s.n} delay={i * 0.06}>
						<div className="step-num">{s.n}</div>
						<h3>{s.title}</h3>
						<p>{s.text}</p>
					</Reveal>
				))}
			</div>
			<p className="how-note">
				Submitting an enquiry does not place an order or confirm availability. Prices,
				quantities, specifications and trade terms are agreed individually.
			</p>
		</section>
	);
}
