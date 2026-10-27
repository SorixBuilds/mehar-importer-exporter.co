import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
	/** Seconds of delay before the reveal starts. */
	delay?: number;
	as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Scroll-reveal wrapper: a 12px rise + fade, once, on enter. Under
 * prefers-reduced-motion it renders statically (no transform, no opacity
 * animation) so nothing moves and there is no layout shift.
 */
export function Reveal({ children, delay = 0, as = 'div', ...rest }: RevealProps) {
	const reduce = useReducedMotion();
	// The rendered tag varies, but props are typed against the div variant; the
	// cast keeps that consistent while the runtime renders the chosen element.
	const MotionTag = motion[as] as typeof motion.div;

	if (reduce) {
		return <MotionTag {...rest}>{children}</MotionTag>;
	}

	return (
		<MotionTag
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '0px 0px -60px 0px' }}
			transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
			{...rest}
		>
			{children}
		</MotionTag>
	);
}
