import type { Route } from './+types/not-found';
import { Link } from 'react-router';
import { seo } from '@/lib/seo';
import { SITE } from '@/data/site';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: `Page not found | ${SITE.name}`,
		description: 'The page you’re looking for could not be found.',
		noindex: true,
	});
}

export default function NotFound() {
	return (
		<main id="main" className="section empty-state">
			<span className="kicker" style={{ justifyContent: 'center' }}>404</span>
			<h1>Page not found</h1>
			<p>The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.</p>
			<Link className="button green" to="/">Return to home</Link>
		</main>
	);
}
