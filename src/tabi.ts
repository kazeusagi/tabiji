import { Context, type ContextShape } from './context';
import type { DescribeHelpers, Runner } from './types';

export class Tabi<C extends ContextShape> {
  private context = new Context<C>();
  private runner: Runner;

  constructor(runner: Runner) {
    this.runner = runner;
  }

  myfn(handler: (c: Context<C>) => void): this {
    handler(this.context);
    return this;
  }

  beforeEach(fn: () => void): this {
    this.runner.beforeEach(fn);
    return this;
  }
  afterEach(fn: () => void): this {
    this.runner.afterEach(fn);
    return this;
  }
  beforeAll(fn: () => void): this {
    this.runner.beforeAll(fn);
    return this;
  }
  afterAll(fn: () => void): this {
    this.runner.afterAll(fn);
    return this;
  }

  describe(name: string, callback: (helpers: DescribeHelpers<C>) => void): this {
    const helpers: DescribeHelpers<C> = {
      it: (name, handler) => this.runner.it(name, () => handler(this.context)),
      test: (...args) => console.log(name),
    };

    this.runner.describe(name, () => callback(helpers));
    return this;
  }

  go(): void {}
}
