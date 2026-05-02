import ContactPageClient from './ContactPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Iveoma Development Network',
  description: 'Direct access channels for institutional partners, government agencies, and community stakeholders of the Iveoma Development Network.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
