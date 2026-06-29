import { createHighlighter } from 'shiki';

const code = `import { Tabiji } from 'tabiji';
import * as vitest from 'vitest';

type MyContext = { message: string };

new Tabiji<MyContext>(vitest)
  .beforeAll((c) => c.set('message', 'start'))
  .describe('calc', ({ it }) => {
    it('add', (_c, { expect }) => expect(1 + 1).toBe(2));
    it('sub', (_c, { expect }) => expect(1 - 1).toBe(0));
  })
  .describe('context', ({ it }) => {
    it('message', (c, { expect }) => expect(c.get('message')).toBe('start'));
  });
`;

export default {
  async load() {
    const hl = await createHighlighter({
      themes: ['github-dark'],
      langs: ['ts'],
    });
    return hl.codeToHtml(code, { lang: 'ts', theme: 'github-dark' });
  },
};
