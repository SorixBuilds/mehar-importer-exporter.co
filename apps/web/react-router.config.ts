import type { Config } from '@react-router/dev/config';

// Static SPA for Hostinger shared hosting (Apache + PHP, no Node runtime).
// `ssr: false` + `prerender` emits a real static HTML file per route into
// ../../dist/apps/web/client, which is uploaded to public_html as-is.
export default {
	appDirectory: 'src',
	buildDirectory: '../../dist/apps/web',
	ssr: false,
	async prerender() {
		return ['/', '/privacy-policy', '/terms-and-conditions'];
	},
} satisfies Config;
