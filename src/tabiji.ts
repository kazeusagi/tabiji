import { Context, type ContextShape } from './context';
import type { DescribeHelpers, Runner } from './types';

export class Tabiji<C extends ContextShape> {
  private context = new Context<C>();

  constructor(private readonly runner: Runner) {}

  beforeEach(fn: (c: Context<C>) => void): this {
    this.runner.beforeEach(() => fn(this.context));
    return this;
  }
  afterEach(fn: (c: Context<C>) => void): this {
    this.runner.afterEach(() => fn(this.context));
    return this;
  }
  beforeAll(fn: (c: Context<C>) => void): this {
    this.runner.beforeAll(() => fn(this.context));
    return this;
  }
  afterAll(fn: (c: Context<C>) => void): this {
    this.runner.afterAll(() => fn(this.context));
    return this;
  }

  describe(name: string, fn: (helpers: DescribeHelpers<C>) => void): this {
    const helpers: DescribeHelpers<C> = {
      beforeEach: (fn) => this.runner.beforeEach(() => fn(this.context)),
      afterEach: (fn) => this.runner.afterEach(() => fn(this.context)),
      beforeAll: (fn) => this.runner.beforeAll(() => fn(this.context)),
      afterAll: (fn) => this.runner.afterAll(() => fn(this.context)),
      describe: (name, fn) => this.runner.describe(name, () => fn(this.makeHelpers())),
      test: (name, fn) => this.runner.test(name, () => fn(this.context)),
      it: (name, fn) => this.runner.it(name, () => fn(this.context)),
    };

    this.runner.describe(name, () => fn(helpers));
    return this;
  }

  private makeHelpers(): DescribeHelpers<C> {
    return {
      beforeEach: (fn) => this.runner.beforeEach(() => fn(this.context)),
      afterEach: (fn) => this.runner.afterEach(() => fn(this.context)),
      beforeAll: (fn) => this.runner.beforeAll(() => fn(this.context)),
      afterAll: (fn) => this.runner.afterAll(() => fn(this.context)),
      describe: (name, fn) => this.runner.describe(name, () => fn(this.makeHelpers())),
      test: (name, fn) => this.runner.test(name, () => fn(this.context)),
      it: (name, fn) => this.runner.it(name, () => fn(this.context)),
    };
  }
}
