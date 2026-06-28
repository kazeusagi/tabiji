type TestFn = (name: string, fn: () => void) => void;

type DescribeHelpers = {
  it: TestFn;
  test: TestFn;
};
type Context = {};

class Tabiji {
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

export function tabiji() {
  return new Tabiji();
}
