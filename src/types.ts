import type { Context, ContextShape } from './context';

export type Runner = {
  beforeEach: (fn: () => void) => void;
  afterEach: (fn: () => void) => void;
  beforeAll: (fn: () => void) => void;
  afterAll: (fn: () => void) => void;
  describe: (name: string, fn: () => void) => void;
  test: (name: string, fn: () => void) => void;
  it: (name: string, fn: () => void) => void;
  expect: (actual: unknown) => any;
};

type TestFn<C extends ContextShape> = (name: string, handler: (c: Context<C>) => void) => void;
type Hook<C extends ContextShape> = (fn: (c: Context<C>) => void) => void;

export type DescribeHelpers<C extends ContextShape> = {
  beforeEach: Hook<C>;
  afterEach: Hook<C>;
  beforeAll: Hook<C>;
  afterAll: Hook<C>;
  describe: (name: string, fn: (helpers: DescribeHelpers<C>) => void) => void;
  test: TestFn<C>;
  it: TestFn<C>;
};
