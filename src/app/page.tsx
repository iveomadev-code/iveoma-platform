import HomePageClient from '@/components/HomePageClient';

export const metadata = {
  title: 'Institutional Impact & Sustainable Development',
  description: 'The Iveoma Development Network (IDN) bridges the gap between global expertise and grassroots implementation to engineer lasting social impact across Nigeria.',
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Iveoma Development Network',
    alternateName: 'IDN',
    url: 'https://iveomadevelopmentnetwork.org',
    logo: 'https://iveomadevelopmentnetwork.org/logo.png',
    description: 'The Iveoma Development Network (IDN) bridges the gap between global expertise and grassroots implementation to engineer lasting social impact across Nigeria.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Okposi',
      addressRegion: 'Ebonyi',
      addressCountry: 'Nigeria'
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Nkata Nwani Chuku'
    },
    foundingDate: '2016',
    sameAs: [
      'https://twitter.com/iveoma', // Example social links
      'https://linkedin.com/company/iveoma'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
