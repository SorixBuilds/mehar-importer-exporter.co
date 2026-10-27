// Resolves bundled asset filenames to their final hashed URLs so components can
// reference images by name (e.g. 'product-red-onions-800.webp') without a static
// import per file. Vite fingerprints each asset at build time.
const mods = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const byName: Record<string, string> = {};
for (const path in mods) {
	const file = path.split('/').pop();
	if (file) byName[file] = mods[path];
}

/** Returns the hashed URL for a bundled asset filename, or '' if unknown. */
export function asset(file: string): string {
	return byName[file] ?? '';
}

/**
 * Builds a `srcset` string from a stem and widths, e.g.
 * srcset('product-red-onions', [400, 800]) ->
 * "/assets/...-400.webp 400w, /assets/...-800.webp 800w".
 */
export function srcset(stem: string, widths: number[]): string {
	return widths
		.map(w => `${asset(`${stem}-${w}.webp`)} ${w}w`)
		.filter(entry => !entry.startsWith(' '))
		.join(', ');
}
