import AboutPageClient from './AboutPageClient';

export const metadata = {
  title: 'About Us | Iveoma Development Network',
  description: 'Learn about Iveoma Development Network — our vision, mission, values, story, and governance. A people-centred development organisation rooted in Ebonyi State.',
};

export default function AboutPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://iveomadevelopmentnetwork.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://iveomadevelopmentnetwork.org/about'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#0A2237] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <div id="main-content">
        <AboutPageClient />
      </div>
    </>
  );
}
