import article1 from './monthly-generator-pm-checklist.md?raw';

export const articles = [
  {
    slug: 'monthly-generator-pm-checklist',
    title: 'چک لیست سرویس ماهانه ژنراتور',
    content: article1,
  },
];

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug);
}
