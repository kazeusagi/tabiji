import type { Context, ContextShape } from './context';

type Matchers = {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toBeTruthy: () => void;
  toBeFalsy: () => void;
  toBeNull: () => void;
  toBeUndefined: () => void;
  toThrow: (expected?: unknown) => void;
  toContain: (expected: unknown) => void;
  not: Matchers;
  // 必要なマッチャーを追加
};

export type Runner = {
  beforeEach: (fn: () => void) => void;
  afterEach: (fn: () => void) => void;
  beforeAll: (fn: () => void) => void;
  afterAll: (fn: () => void) => void;
  describe: (name: string, fn: () => void) => void;
  test: (name: string, fn: () => void) => void;
  it: (name: string, fn: () => void) => void;
  expect: (actual: unknown) => Matchers;
};

type Tools = {
  expect: Runner['expect'];
};

type TestFn<C extends ContextShape> = (
  name: string,
  handler: (c: Context<C>, tools: Tools) => void,
) => void;
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
