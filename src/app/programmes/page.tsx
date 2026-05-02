import { Metadata } from 'next';
import ProgrammesPageClient from './ProgrammesPageClient';

export const metadata: Metadata = {
  title: 'Programmes | Iveoma Development Network',
  description: 'Targeted Interventions. Systemic Change. Explore the Iveoma Development Network’s structured system of interventions across digital literacy, infrastructure, health, and crisis response.',
};

export default function ProgrammesPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://iveomadevelopmentnetwork.org' },
      { '@type': 'ListItem', position: 2, name: 'Programmes', item: 'https://iveomadevelopmentnetwork.org/programmes' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProgrammesPageClient />
    </>
  );
}
