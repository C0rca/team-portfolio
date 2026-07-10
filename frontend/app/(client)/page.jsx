import Home from "../../src/views/client/Home";

async function getHomepageData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  try {
    const [services, projects, members, testimonials, articles, homepageSettings, generalSettings] = await Promise.all([
      fetch(`${baseUrl}/api/services/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : []),
      fetch(`${baseUrl}/api/projects/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : []),
      fetch(`${baseUrl}/api/members/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : []),
      fetch(`${baseUrl}/api/testimonials/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : []),
      fetch(`${baseUrl}/api/articles/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : []),
      fetch(`${baseUrl}/api/settings/homepage/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : null),
      fetch(`${baseUrl}/api/settings/general/`, { next: { tags: ['homepage'], revalidate: 3600 } }).then(res => res.ok ? res.json() : null)
    ]);

    return {
      services: Array.isArray(services) ? services : [],
      projects: Array.isArray(projects) ? projects : [],
      members: Array.isArray(members) ? members : [],
      testimonials: Array.isArray(testimonials) ? testimonials : [],
      articles: Array.isArray(articles) ? articles.slice(0, 3) : [],
      homepageSettings: homepageSettings?.value || null,
      settings: generalSettings?.value || {
        email: 'info@c0team.com',
        phone: '+98 912 345 6789',
        address_fa: 'تهران، میدان ونک، برج نگار',
        address_en: 'Negar Tower, Vanak Sq, Tehran',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' }
      }
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Fallback empty data if backend is down
    return {
      services: [], projects: [], members: [], testimonials: [], articles: [],
      homepageSettings: null, settings: {}
    };
  }
}

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  let title = 'C0 Team | تیم طراحی و توسعه';
  let description = 'ارائه دهنده خدمات توسعه وب، اپلیکیشن و سئو با بالاترین کیفیت.';
  
  try {
    const homepageSettings = await fetch(`${baseUrl}/api/settings/homepage/`, { next: { tags: ['homepage'], revalidate: 3600 } })
      .then(res => res.ok ? res.json() : null);
    
    if (homepageSettings?.value?.hero_title_fa) {
      title = homepageSettings.value.hero_title_fa;
    }
    if (homepageSettings?.value?.hero_subtitle_fa) {
      description = homepageSettings.value.hero_subtitle_fa;
    }
  } catch (error) {}

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fa_IR',
    }
  };
}

export default async function Page() {
  const initialData = await getHomepageData();
  return <Home initialData={initialData} />;
}
