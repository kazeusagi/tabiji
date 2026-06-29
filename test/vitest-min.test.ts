import * as vitest from 'vitest';
import { Tabiji } from '../dist/index.mjs';

type MyContext = { message: string };

new Tabiji<MyContext>(vitest)
  .beforeAll((c) => c.set('message', 'start'))
  .describe('context', ({ it }) => {
    it('message', (c, { expect }) => expect(c.get('message')).toBe('start'));
  })
  .describe('calc', ({ it }) => {
    it('add', (_c, { expect }) => expect(1 + 1).toBe(2));
    it('sub', (_c, { expect }) => expect(1 - 1).toBe(0));
  });
