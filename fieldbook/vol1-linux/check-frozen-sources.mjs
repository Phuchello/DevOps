import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = {
  '00': ['fieldbook/vol1-linux/chapters/00-linux-mental-model/part-01.md', 'fieldbook/vol1-linux/chapters/00-linux-mental-model/part-02.md', 'fieldbook/vol1-linux/chapters/00-linux-mental-model/part-03.md', 'fieldbook/vol1-linux/chapters/00-linux-mental-model/part-04.md'],
  '01': ['fieldbook/vol1-linux/chapters/01-filesystem-namespace/part-01.md', 'fieldbook/vol1-linux/chapters/01-filesystem-namespace/part-02.md', 'fieldbook/vol1-linux/chapters/01-filesystem-namespace/part-03.md'],
  '02': ['fieldbook/vol1-linux/chapters/02-streams-pipes-redirection/part-01.md', 'fieldbook/vol1-linux/chapters/02-streams-pipes-redirection/part-02.md'],
  '03': ['fieldbook/vol1-linux/chapters/03-search-transform/part-01.md']
};

const expected = new Map(readFileSync(resolve(root, 'fieldbook/vol1-linux/FROZEN_SOURCES.sha256'), 'utf8').trim().split(/\r?\n/).map(line => {
  const match = line.match(/^(\S+)\s+Chapter (\d+)/);
  if (!match) throw new Error(`Invalid frozen manifest line: ${line}`);
  return [match[2], match[1]];
}));
// Git stores these public learner sources with LF bytes. Normalize a Windows
// CRLF checkout before hashing so the manifest verifies the canonical Git
// source, not a platform-specific working-tree representation.
const canonicalSourceBytes = (file) => Buffer.from(readFileSync(resolve(root, file), 'utf8').replace(/\r\n/g, '\n'), 'utf8');
for (const [chapter, files] of Object.entries(chapters)) {
  const hash = createHash('sha256');
  for (const file of files) hash.update(canonicalSourceBytes(file));
  const actual = hash.digest('hex');
  if (actual !== expected.get(chapter)) throw new Error(`FROZEN_SOURCES_FAIL Chapter ${chapter}: ${actual}`);
}
console.log('FROZEN_SOURCES_OK');
