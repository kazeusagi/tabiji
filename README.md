# Tabiji

[![vitest](https://github.com/kazeusagi/tabiji/actions/workflows/vitest.yml/badge.svg)](https://github.com/kazeusagi/tabiji/actions/workflows/vitest.yml)
[![buntest](https://github.com/kazeusagi/tabiji/actions/workflows/bun.yml/badge.svg)](https://github.com/kazeusagi/tabiji/actions/workflows/bun.yml)
[![npm](https://img.shields.io/npm/v/tabiji)](https://www.npmjs.com/package/tabiji)
[![size](https://img.shields.io/bundlephobia/min/tabiji)](https://www.npmjs.com/package/tabiji)
[![zpisize](https://img.shields.io/bundlephobia/minzip/tabiji)](https://www.npmjs.com/package/tabiji)
[![downloads](https://img.shields.io/npm/dm/tabiji)](https://www.npmjs.com/package/tabiji)

## 既存のテストランナーを薄くラップし、Honoライクなメソッドチェーン形式でテストを書けるようにするライブラリです。

`Vitest` と `bun:test` をサポートしています。

## Features

- 🔗 **メソッドチェーン形式のAPI** — Hono ライクなをメソッドチェーンでテストを記述
- 🔒 **型安全な共有コンテキスト** — コンテキストを型引数で宣言することで、テスト間で型安全にコンテキストにアクセス可能
- 🔌 **複数のテストランナーをサポート** — `Vitest`, `bun:test` に対応
- 🪶 **極小・ゼロ依存** — ゼロ依存で5KB未満の極小サイズ

## Installation

```sh
# npm
npm install -D tabiji

# bun
bun add -D tabiji
```

テストランナー（Vitest 等）は別途インストールしてください。

## Usage

### Vitest

```ts
import { Tabiji } from 'tabiji';
import * as testRunner from 'vitest';

type MyContext = { message: string };

new Tabiji<MyContext>(testRunner)
  .beforeAll((c) => c.set('message', 'start'))
  .describe('context', ({ it }) => {
    it('message', (c, { expect }) => expect(c.get('message')).toBe('start'));
  })
  .describe('calc', ({ it }) => {
    it('add', (_c, { expect }) => expect(1 + 1).toBe(2));
    it('sub', (_c, { expect }) => expect(1 - 1).toBe(0));
  });
```

### bun:test

ランナーを差し替えるだけです

```diff
-import * as testRunner from 'vitest';
+import * as testRunner from 'bun:test';
```

## License

[MIT](./LICENSE) © kazeusagi
