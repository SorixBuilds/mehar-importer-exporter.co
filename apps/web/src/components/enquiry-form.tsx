import { useState } from 'react';
import { Link } from 'react-router';
import { Check, ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsapp } from '@/data/site';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'product' | 'message' | 'consent', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm() {
	const [status, setStatus] = useState<Status>('idle');
	const [errors, setErrors] = useState<Errors>({});
	const [errorMsg, setErrorMsg] = useState('');

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const fd = new FormData(form);
		const get = (k: string) => String(fd.get(k) ?? '').trim();

		const next: Errors = {};
		if (!get('name')) next.name = 'Please enter your name.';
		if (!get('email')) next.email = 'Please enter your email address.';
		else if (!EMAIL_RE.test(get('email'))) next.email = 'Please enter a valid email address.';
		if (!get('product')) next.product = 'Please tell us which produce you need.';
		if (!get('message')) next.message = 'Please add a short message.';
		if (!fd.get('consent')) next.consent = 'Please accept the privacy policy to continue.';

		setErrors(next);
		if (Object.keys(next).length) return;

		setStatus('sending');
		setErrorMsg('');
		try {
			const payload = {
				name: get('name'), email: get('email'), phone: get('phone'),
				company: get('company'), country: get('country'), product: get('product'),
				quantity: get('quantity'), message: get('message'),
				// Honeypot: real users leave this empty.
				website: get('website'),
			};
			const res = await fetch('/contact.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(payload),
			});
			const data = await res.json().catch(() => ({ ok: false }));
			if (res.ok && data.ok) {
				form.reset();
				setStatus('success');
			} else {
				setErrorMsg(data.error || 'We couldn’t send your enquiry. Please try again or message us on WhatsApp.');
				setStatus('error');
			}
		} catch {
			setErrorMsg('We couldn’t reach the server. Please try again or message us on WhatsApp.');
			setStatus('error');
		}
	}

	if (status === 'success') {
		return (
			<div className="form-success" role="status">
				<span className="tick"><Check size={28} /></span>
				<h3>Thank you — your enquiry is in.</h3>
				<p>We&rsquo;ve received your message and will reply to your email. For a faster response, message us directly on WhatsApp.</p>
				<div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
					<a className="button whatsapp" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Chat on WhatsApp</a>
					<button className="button ghost" onClick={() => setStatus('idle')}>Send another enquiry</button>
				</div>
			</div>
		);
	}

	return (
		<form className="enquiry-form" onSubmit={onSubmit} noValidate>
			<div className="form-grid">
				<div className="field">
					<label htmlFor="f-name">Your name <span className="req" aria-hidden="true">*</span></label>
					<input id="f-name" name="name" autoComplete="name" maxLength={160} aria-required="true" aria-invalid={!!errors.name} placeholder="Full name" />
					{errors.name && <span className="field-error" role="alert">{errors.name}</span>}
				</div>
				<div className="field">
					<label htmlFor="f-email">Business email <span className="req" aria-hidden="true">*</span></label>
					<input id="f-email" name="email" type="email" autoComplete="email" maxLength={200} aria-required="true" aria-invalid={!!errors.email} placeholder="you@company.com" />
					{errors.email && <span className="field-error" role="alert">{errors.email}</span>}
				</div>
				<div className="field">
					<label htmlFor="f-company">Company</label>
					<input id="f-company" name="company" autoComplete="organization" maxLength={200} placeholder="Company (optional)" />
				</div>
				<div className="field">
					<label htmlFor="f-country">Country</label>
					<input id="f-country" name="country" autoComplete="country-name" maxLength={120} placeholder="Destination country (optional)" />
				</div>
				<div className="field">
					<label htmlFor="f-product">Product(s) <span className="req" aria-hidden="true">*</span></label>
					<input id="f-product" name="product" maxLength={200} aria-required="true" aria-invalid={!!errors.product} placeholder="e.g. Red onions, potatoes" />
					{errors.product && <span className="field-error" role="alert">{errors.product}</span>}
				</div>
				<div className="field">
					<label htmlFor="f-quantity">Quantity</label>
					<input id="f-quantity" name="quantity" maxLength={120} placeholder="e.g. 2 x 40ft (optional)" />
				</div>
				<div className="field full">
					<label htmlFor="f-message">Your message <span className="req" aria-hidden="true">*</span></label>
					<textarea id="f-message" name="message" maxLength={4000} rows={5} aria-required="true" aria-invalid={!!errors.message} placeholder="Tell us your requirement, preferred packing and timing." />
					{errors.message && <span className="field-error" role="alert">{errors.message}</span>}
				</div>
			</div>

			{/* Honeypot — hidden from users, catches bots. */}
			<div className="hp-field" aria-hidden="true">
				<label htmlFor="f-website">Website</label>
				<input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
			</div>

			<div className="field consent">
				<input id="f-consent" name="consent" type="checkbox" aria-invalid={!!errors.consent} />
				<span>
					I agree to the <Link to="/privacy-policy">Privacy Policy</Link> and consent to being
					contacted about this enquiry.
				</span>
			</div>
			{errors.consent && <span className="field-error" role="alert">{errors.consent}</span>}

			{status === 'error' && <p className="form-alert error" role="alert">{errorMsg}</p>}

			<button className="button" type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? 'Sending…' : 'Send Enquiry'} <ArrowUpRight size={17} />
			</button>
			<p className="form-foot">Submitting an enquiry does not place an order or confirm availability.</p>
		</form>
	);
}
