import { Link } from 'react-router';
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { SITE, whatsapp } from '@/data/site';
import { asset } from '@/lib/assets';

export function SiteFooter() {
	return (
		<>
			<footer>
				<div className="footer-inner">
					<div className="footer-grid">
						<div className="footer-brand">
							<div className="brand">
								<img src={asset('logo-80.webp')} width="46" height="46" alt="" aria-hidden="true" style={{ borderRadius: '50%' }} />
								<span className="brand-name">
									<strong>MEHAR</strong>
									<small>IMPORTER &amp; EXPORTER CO.</small>
								</span>
							</div>
							<p className="footer-about">
								Fresh fruit and vegetables from Pakistan, graded and packed for wholesale
								and export. Trade built on clear communication and honest quotations.
							</p>
							<p className="footer-tag">QUETTA · BALOCHISTAN · PAKISTAN</p>
						</div>

						<div className="footer-col">
							<h4>Explore</h4>
							<a href="/#products">Our Products</a>
							<a href="/#about">About Us</a>
							<a href="/#how-we-work">How We Work</a>
							<a href="/#markets">Markets</a>
							<a href="/#contact">Contact &amp; Enquiry</a>
						</div>

						<div className="footer-col footer-contact">
							<h4>Get in touch</h4>
							<a href={whatsapp()} target="_blank" rel="noopener noreferrer">
								<MessageCircle size={16} /> WhatsApp: {SITE.phoneDisplay}
							</a>
							<a href={`tel:${SITE.landlineTel}`}>
								<Phone size={16} /> Office: {SITE.landlineDisplay}
							</a>
							<a href={`mailto:${SITE.email}`}>
								<Mail size={16} /> {SITE.email}
							</a>
							<p style={{ display: 'flex', gap: 9 }}>
								<MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
								<span>{SITE.address}</span>
							</p>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
					<span style={{ display: 'flex', gap: 18 }}>
						<Link to="/privacy-policy">Privacy Policy</Link>
						<Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
					</span>
				</div>
			</footer>

			<a
				className="floating-whatsapp"
				href={whatsapp()}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Enquire on WhatsApp"
			>
				<MessageCircle size={22} />
				<span>Enquire on WhatsApp</span>
			</a>
		</>
	);
}
