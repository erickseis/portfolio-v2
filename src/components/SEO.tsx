import React from 'react';
import { Helmet } from 'react-helmet';

const SEO: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Erick Seis",
    "url": "https://ericksoto.dev",
    "jobTitle": "Desarrollador Full Stack",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "INACAP"
    },
    "sameAs": [
      "https://linkedin.com/in/erickseis",
      "https://github.com/erickseis"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "React",
      "Node.js",
      "PostgreSQL",
      "Python",
      "AI Automation"
    ],
    "description": "Desarrollador Full Stack con 3 años de experiencia. Especialista en React, Node.js y automatización con IA."
  };

  return (
    <Helmet>
      <title>Erick Seis | Desarrollador Full Stack & IA</title>
      <meta name="description" content="Portafolio de Erick Seis. Desarrollador Full Stack experto en React, Node.js y PostgreSQL. Soluciones web modernas y automatización con Inteligencia Artificial." />
      <meta name="keywords" content="Erick Seis, Full Stack Developer, React, Node.js, Chile, Arica, Programador, Automatización, Inteligencia Artificial" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ericksoto.dev/" />
      <meta property="og:title" content="Erick Seis | Desarrollador Full Stack & IA" />
      <meta property="og:description" content="Desarrollador Full Stack con 3 años de experiencia. Especialista en React, Node.js y automatización." />
      <meta property="og:image" content="https://ericksoto.dev/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ericksoto.dev/" />
      <meta property="twitter:title" content="Erick Seis | Desarrollador Full Stack & IA" />
      <meta property="twitter:description" content="Desarrollador Full Stack con 3 años de experiencia. Especialista en React, Node.js y automatización." />
      <meta property="twitter:image" content="https://ericksoto.dev/og-image.jpg" />

      {/* AI & Search Engine Hints */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
