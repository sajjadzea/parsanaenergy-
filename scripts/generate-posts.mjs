import { promises as fs } from 'fs';
import path from 'path';

const articlesDir = path.join('docs', 'public', 'articles');
const outputDir = path.join('docs', 'articles');
const outputFile = path.join(outputDir, 'posts.json');
const publicOutputDir = path.join('docs', 'public', 'articles');

let existing = [];
try {
  const raw = await fs.readFile(outputFile, 'utf8');
  existing = JSON.parse(raw);
} catch {
  existing = [];
}
const existingMap = new Map(existing.map(p => [p.slug, p]));

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function extractFirstParagraph(content) {
  const afterTitle = content.split(/^#\s+.+$/m)[1] || '';
  const paragraphs = afterTitle.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  return paragraphs[0] || '';
}

function calculateReadingTime(text) {
  const clean = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/[#!*>_\-]/g, ' ')
    .replace(/\d+\.\s*/g, ' ');
  const words = clean.trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 180));
}

async function processMarkdown(file) {
  const slug = path.basename(file, '.md');
  const filePath = path.join(articlesDir, file);
  const content = await fs.readFile(filePath, 'utf8');
  const title = extractTitle(content);
  let excerpt = extractFirstParagraph(content);
  if (excerpt.length > 200) {
    excerpt = excerpt.slice(0, 200).trim() + '…';
  } else {
    excerpt = excerpt.replace(/[.\s]*$/, '') + '…';
  }
  const stats = await fs.stat(filePath);
  const prev = existingMap.get(slug);
  const date = prev?.date || stats.mtime.toISOString().split('T')[0];

  const coverPath = path.join('docs', 'images', 'articles', `${slug}.webp`);
  const cover = prev?.cover || ((await fileExists(coverPath))
    ? `/images/articles/${slug}.webp`
    : '/images/articles/default.webp');

  return {
    slug,
    title,
    cover,
    date,
    readingTime: calculateReadingTime(content),
    excerpt,
    tags: [],
    published: true
  };
}

async function build() {
  const entries = await fs.readdir(articlesDir);
  const mdFiles = entries.filter(f => f.endsWith('.md'));
  const posts = [];
  for (const file of mdFiles) {
    const post = await processMarkdown(file);
    posts.push(post);
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(posts, null, 2), 'utf8');
  await fs.mkdir(publicOutputDir, { recursive: true });
  await fs.writeFile(path.join(publicOutputDir, 'posts.json'), JSON.stringify(posts, null, 2), 'utf8');
}

build();
