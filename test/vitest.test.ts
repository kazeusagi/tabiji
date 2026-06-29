import { Tabiji } from 'tabiji';
import * as runner from 'vitest';

type MyContext = { message: string };

new Tabiji<MyContext>(runner)
  .beforeAll((c) => c.set('message', 'start'))
  .describe('context', ({ it }) => {
    it('message', (c, { expect }) => expect(c.get('message')).toBe('start'));
  })
  .describe('calc', ({ it }) => {
    it('add', (_c, { expect }) => expect(1 + 1).toBe(2));
    it('sub', (_c, { expect }) => expect(1 - 1).toBe(0));
  });
