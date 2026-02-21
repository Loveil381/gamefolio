import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch for jobs, game ideas, or just to say hi.',
};

export default function ContactPage() {
    return <ContactClient />;
}
