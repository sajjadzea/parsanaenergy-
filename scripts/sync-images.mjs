import { cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
if (existsSync('docs/images')) {
  await cp('docs/images', 'docs/public/images', { recursive: true });
}
