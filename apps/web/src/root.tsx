import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import { SITE } from '@/data/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
	{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap',
	},
];

/** Publishes the site's public origin for `seo()` (canonical, og:url). Static — no server. */
export function loader() {
	return { origin: SITE.origin };
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning absorbs attributes injected by browser extensions
		// before hydration; attribute-only, one element deep.
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#14401F" />
				<Meta />
				<Links />
			</head>
			<body suppressHydrationWarning>
				<a className="skip-link" href="#main">Skip to content</a>
				<div id="root">{children}</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<SiteHeader />
			<Outlet />
			<SiteFooter />
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Something went wrong';
	let details = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? 'Page not found' : 'Error';
		details =
			error.status === 404
				? 'The page you’re looking for could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error instanceof Error) {
		details = error.message;
	}

	return (
		<main id="main" className="section empty-state">
			<h1>{message}</h1>
			<p>{details}</p>
			<a className="button" href="/">Return to home</a>
		</main>
	);
}
