import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE, whatsapp } from '@/data/site';
import { EnquiryForm } from '@/components/enquiry-form';
import { Reveal } from '@/components/reveal';

export function Contact() {
	return (
		<section className="section contact" id="contact">
			<div className="contact-grid">
				<Reveal className="contact-info">
					<span className="kicker">Contact &amp; Quote</span>
					<h2 className="section-title">Start your enquiry</h2>
					<p className="section-lead">
						The fastest way to a quote is WhatsApp. Prefer email? Use the form and
						we&rsquo;ll reply with availability and pricing.
					</p>

					<div className="contact-item">
						<MessageCircle aria-hidden="true" />
						<div>
							<h3>WhatsApp (fastest)</h3>
							<a href={whatsapp()} target="_blank" rel="noopener noreferrer">{SITE.phoneDisplay}</a>
						</div>
					</div>
					<div className="contact-item">
						<Phone aria-hidden="true" />
						<div>
							<h3>Office landline</h3>
							<a href={`tel:${SITE.landlineTel}`}>{SITE.landlineDisplay}</a>
						</div>
					</div>
					<div className="contact-item">
						<Mail aria-hidden="true" />
						<div>
							<h3>Email</h3>
							<a href={`mailto:${SITE.email}`}>{SITE.email}</a>
						</div>
					</div>
					<div className="contact-item">
						<MapPin aria-hidden="true" />
						<div>
							<h3>Office</h3>
							<p>{SITE.address}</p>
						</div>
					</div>
					<div className="contact-item">
						<Clock aria-hidden="true" />
						<div>
							<h3>Enquiries</h3>
							<p>We reply to enquiries as quickly as we can, Pakistan Standard Time (PKT).</p>
						</div>
					</div>
				</Reveal>

				<Reveal className="contact-panel" delay={0.08}>
					<h3>Send an enquiry</h3>
					<p>Fields marked <span style={{ color: 'var(--error)' }}>*</span> are required.</p>
					<EnquiryForm />
				</Reveal>
			</div>
		</section>
	);
}
