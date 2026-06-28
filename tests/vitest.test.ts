import * as vitest from 'vitest';
import { Tabiji } from '../dist/index.mjs';

type MyEnv = { userId: number; userName: string };

new Tabiji<MyEnv>(vitest)
  .beforeEach(() => {})
  .describe('aa', ({ it }) => {
    it('', () => {});
    it('', () => {});
  })
  .myfn((c) => {
    c.set('userId', 12);
    console.log(c.get('userId'));
  });
