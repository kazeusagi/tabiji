type TestFn = (name: string, fn: () => void) => void;

export type DescribeHelpers = {
  it: TestFn;
  test: TestFn;
};

export type Runner = {
  describe: (name: string, fn: () => void) => void;
  it: (name: string, fn: () => void | Promise<void>) => void;
  expect: (actual: unknown) => any;
};

export type ContextShape = Record<string, unknown>;
