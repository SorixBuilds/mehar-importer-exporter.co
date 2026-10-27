import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, Menu, X, MapPin } from 'lucide-react';
import { SITE, whatsapp } from '@/data/site';
import { asset } from '@/lib/assets';

const NAV: [string, string][] = [
	['/', 'Home'],
	['/#products', 'Products'],
	['/#about', 'About'],
	['/#how-we-work', 'How We Work'],
	['/#contact', 'Contact'],
];

function Logo() {
	return (
		<Link className="brand" to="/" aria-label={`${SITE.name} — home`}>
			<img src={asset('logo-80.webp')} width="44" height="44" alt="" aria-hidden="true" />
			<span className="brand-name">
				<strong>MEHAR</strong>
				<small>IMPORTER &amp; EXPORTER CO.</small>
			</span>
		</Link>
	);
}

export function SiteHeader() {
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const [scrolled, setScrolled] = useState(!isHome);
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	// Solid header once scrolled, and always solid on pages without a hero.
	useEffect(() => {
		if (!isHome) {
			setScrolled(true);
			return;
		}
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [isHome]);

	// Mobile menu: lock scroll, trap focus, close on Esc.
	useEffect(() => {
		if (!open) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const menu = menuRef.current;
		const focusable = menu?.querySelectorAll<HTMLElement>('a[href], button');
		focusable?.[0]?.focus();

		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') { setOpen(false); return; }
			if (e.key === 'Tab' && focusable && focusable.length) {
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
				else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
			}
		}
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
			toggleRef.current?.focus();
		};
	}, [open]);

	return (
		<header className={scrolled ? 'site-header scrolled' : 'site-header'}>
			<div className="header-inner">
				<Logo />
				<nav className="main-nav" aria-label="Primary">
					{NAV.map(([to, label]) => (
						<a className="nav-link" key={label} href={to}>{label}</a>
					))}
				</nav>
				<div className="header-actions">
					<a className="button small btn-quote" href="/#contact">
						Get a Quote <ArrowUpRight size={16} />
					</a>
					<button
						ref={toggleRef}
						className="menu-toggle"
						aria-label="Open menu"
						aria-expanded={open}
						aria-controls="mobile-nav"
						onClick={() => setOpen(true)}
					>
						<Menu size={26} />
					</button>
				</div>
			</div>

			{open && (
				<div className="mobile-nav" id="mobile-nav" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site menu">
					<div className="mobile-nav-top">
						<Logo />
						<button className="menu-toggle" aria-label="Close menu" onClick={() => setOpen(false)}>
							<X size={28} />
						</button>
					</div>
					<nav aria-label="Mobile">
						{NAV.map(([to, label]) => (
							<a className="nav-link" key={label} href={to} onClick={() => setOpen(false)}>{label}</a>
						))}
					</nav>
					<a className="button whatsapp" href={whatsapp()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
						Request a Quote on WhatsApp <ArrowUpRight size={16} />
					</a>
					<div className="mobile-nav-contact">
						<span><MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{SITE.city}, {SITE.country}</span>
						<span>{SITE.phoneDisplay}</span>
					</div>
				</div>
			)}
		</header>
	);
}
