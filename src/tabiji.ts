class Tabiji {
  private stri = '';

  constructor() {}

  describe(): this {
    return this;
  }
  test(): this {
    return this;
  }
  it(): this {
    return this;
  }
  beforeEach(): this {
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
  go(): void {}
}

export function tabiji() {
  return new Tabiji();
}
