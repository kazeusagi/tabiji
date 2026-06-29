import * as bun from 'bun:test';
import { Tabiji } from '../dist/index.mjs';

type MyContext = { count: number };

new Tabiji<MyContext>(bun)
  .beforeAll((c) => {
    c.set('count', 10);
  })
  .beforeEach((c) => {
    c.set('count', (prev) => prev + 1);
  })
  .describe('aa', ({ it }) => {
    it('case 1', (c) => {
      console.log(c.get('count'));
    });
    it('case 2', (c) => {
      console.log(c.get('count'));
    });
  })
  .describe('iiu', ({ it }) => {
    it('case 3', (c) => {
      console.log(c.get('count'));
    });
    it('case 4', (c) => {
      console.log(c.get('count'));
    });
  });
