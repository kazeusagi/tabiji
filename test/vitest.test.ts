import * as vitest from 'vitest';
import { Tabiji } from '../dist/index.mjs';

type MyInventory = { money: number; items: string[] };
vitest.expect;

new Tabiji<MyInventory>(vitest)
  .beforeAll((c) => {
    c.set('money', 300);
    c.set('items', ['stone']);
  })
  .describe('アイテムショップ', ({ it }) => {
    it('剣を買った', (c, { expect }) => {
      expect(c.get('money')).toBe(300);
      c.set('items', (prev) => [...prev, 'sword']);
      c.set('money', (prev) => prev - 100);
      expect(c.get('money')).toBe(200);
      expect(c.get('items')).toContain('sword');
    });
    it('石ころを売った', (c, { expect }) => {
      expect(c.get('money')).toBe(200);
      expect(c.get('items')).toContain('stone');
      c.set('items', (prev) => [...prev, 'sword']);
      c.set('money', (prev) => prev - 100);
    });
  })
  .describe('iiu', ({ it }) => {
    it('case 3', (c, { expect }) => {
      expect(c.get('money')).toBe(330);
      c.set('money', (prev) => prev - 100);
    });
    it('case 4', (c, { expect }) => {
      expect(c.get('money')).toBe(340);
    });
  });


