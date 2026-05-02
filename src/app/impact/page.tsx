import ImpactPageClient from './ImpactPageClient';

export const metadata = {
  title: 'Our Impact | Iveoma Development Network',
  description: 'Measurable socio-economic development and systemic resilience in Ebonyi State and beyond.',
};

export default function ImpactPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://iveomadevelopmentnetwork.org' },
      { '@type': 'ListItem', position: 2, name: 'Impact', item: 'https://iveomadevelopmentnetwork.org/impact' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ImpactPageClient />
    </>
  );
}
