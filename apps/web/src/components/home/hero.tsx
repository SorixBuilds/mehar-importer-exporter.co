import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, MapPin, Leaf } from 'lucide-react';
import { SITE, whatsapp } from '@/data/site';
import { asset, srcset } from '@/lib/assets';

const WORDS = ['Onions', 'Potatoes', 'Mangoes', 'Grapes', 'Garlic'];

function RotatingWord({ reduce }: { reduce: boolean | null }) {
	const [i, setI] = useState(0);
	useEffect(() => {
		if (reduce) return;
		const t = setInterval(() => setI(v => (v + 1) % WORDS.length), 2200);
		return () => clearInterval(t);
	}, [reduce]);

	if (reduce) {
		return <span className="rot-word">fresh produce</span>;
	}
	return (
		<span className="rot-word">
			<AnimatePresence mode="wait">
				<motion.span
					key={WORDS[i]}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					transition={{ duration: 0.4 }}
					style={{ display: 'inline-block' }}
				>
					{WORDS[i]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}

function Line({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean | null }) {
	if (reduce) return <span style={{ display: 'block' }}>{children}</span>;
	return (
		<span style={{ display: 'block', overflow: 'hidden' }}>
			<motion.span
				style={{ display: 'block' }}
				initial={{ y: '110%' }}
				animate={{ y: '0%' }}
				transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
			>
				{children}
			</motion.span>
		</span>
	);
}

export function Hero() {
	const reduce = useReducedMotion();
	return (
		<section className="hero" aria-label="Introduction">
			<motion.img
				className="hero-media"
				src={asset('hero-port-1280.webp')}
				srcSet={srcset('hero-port', [768, 1280, 1672])}
				sizes="100vw"
				width={1672}
				height={940}
				alt="Container ship loading cargo at a commercial seaport at sunset"
				fetchPriority="high"
				decoding="async"
				initial={reduce ? undefined : { scale: 1 }}
				animate={reduce ? undefined : { scale: 1.06 }}
				transition={reduce ? undefined : { duration: 9, ease: 'easeOut' }}
			/>
			<div className="hero-overlay" aria-hidden="true" />
			<div className="hero-inner">
				<motion.p
					className="hero-eyebrow"
					initial={reduce ? undefined : { opacity: 0 }}
					animate={reduce ? undefined : { opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					Fresh from Pakistan
				</motion.p>

				<h1>
					<Line delay={0.1} reduce={reduce}>From Pakistan&rsquo;s Fields</Line>
					<Line delay={0.22} reduce={reduce}>to the <span className="accent">World&rsquo;s Markets.</span></Line>
				</h1>

				<motion.p
					className="hero-rotator"
					initial={reduce ? undefined : { opacity: 0 }}
					animate={reduce ? undefined : { opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					Exporting fresh <RotatingWord reduce={reduce} />
				</motion.p>

				<motion.p
					className="hero-sub"
					initial={reduce ? undefined : { opacity: 0 }}
					animate={reduce ? undefined : { opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					Quetta-based traders of fresh fruit and vegetables — graded, packed and
					quoted for wholesale buyers, distributors and international importers.
				</motion.p>

				<motion.div
					className="hero-ctas"
					initial={reduce ? undefined : { opacity: 0, y: 10 }}
					animate={reduce ? undefined : { opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.7 }}
				>
					<a className="button" href={whatsapp()} target="_blank" rel="noopener noreferrer">
						Request a Quote on WhatsApp <ArrowUpRight size={18} />
					</a>
					<a className="button on-dark" href="#products">
						View Our Products <ArrowRight size={18} />
					</a>
				</motion.div>

				<div className="hero-meta">
					<span><MapPin size={15} /> {SITE.city}, {SITE.country}</span>
					<span><Leaf size={15} /> Export-grade handling</span>
					<span>WhatsApp {SITE.phoneDisplay}</span>
				</div>
			</div>
			<div className="scroll-cue" aria-hidden="true">Scroll to explore</div>
		</section>
	);
}
