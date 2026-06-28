import { tabiji } from '../dist/index.mjs';
import * as vitest from "vitest";


tabiji(vitest)
  .beforeEach(() => setup())
  .describe('計算', (t, { it, describe }) => {
    it('足し算', () => expect(1 + 1).toBe(2));
    it('引き算', () => expect(2 - 1).toBe(1));

    describe('負の数', (t, { it }) => {
      it('マイナス同士', () => expect(-1 + -1).toBe(-2));
    });
  });
