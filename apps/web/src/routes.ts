import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('privacy-policy', 'routes/legal.tsx', { id: 'privacy-policy' }),
	route('terms-and-conditions', 'routes/legal.tsx', { id: 'terms-and-conditions' }),
	route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
