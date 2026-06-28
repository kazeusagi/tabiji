import { Context } from './context';
import type { ContextShape, DescribeHelpers, Runner } from './types';

export class Tabiji<C extends ContextShape> {
  private context = new Context<C>();

  constructor(runner: Runner) {}

  myfn(handler: (c: Context<C>) => void): this {
    handler(this.context);
    return this;
  }

  beforeEach(fn: () => void): this {
    return this;
  }
  afterEach(): this {
    return this;
  }
  beforeAll(): this {
    return this;
  }
  afterAll(): this {
    return this;
  }

  describe(name: string, callback: (helpers: DescribeHelpers) => void): this {
    const helpers: DescribeHelpers = {
      it: (...args) => console.log(name, ...args),
      test: (...args) => console.log(name, ...args),
    };
    callback(helpers);
    return this;
  }

  go(): void {}
}
