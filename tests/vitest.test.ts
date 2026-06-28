import * as vitest from 'vitest';
import { Tabi } from '../dist/index.mjs';

type MyEnv = { userId: number; userName: string };

new Tabi<MyEnv>(vitest)
  .beforeEach((c) => {
    console.log('beforeEach');
  })
  .describe('aa', ({ it }) => {
    it('case 1', (c) => {
      console.log(c.get('userId'));
    });
    it('case 2', () => {});
  })
  .describe('iiu', ({ it }) => {
    it('case 3', () => {});
    it('case 4', () => {});
  })
  .myfn((c) => {
    c.set('userId', 12);
    console.log(c.get('userId'));
  });
