import { tabiji } from '../dist/index.mjs';

// tabiji(vitest)
//   .beforeEach(() => setup())
//   .describe('計算', (t, { it, describe }) => {
//     it('足し算', () => expect(1 + 1).toBe(2));
//     it('引き算', () => expect(2 - 1).toBe(1));

//   });

tabiji()
  .beforeEach(() => {})
  .describe('aa', ({ it }) => {
    it('', () => {});
  });
