# tabiji

![bun](https://github.com/kazeusagi/tabiji/actions/workflows/bun.yml/badge.svg)
![vitest](https://github.com/kazeusagi/tabiji/actions/workflows/vitest.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/tabiji)](https://www.npmjs.com/package/tabiji)
[![size](https://img.shields.io/bundlephobia/min/tabiji)](https://www.npmjs.com/package/tabiji)
[![size](https://img.shields.io/bundlephobia/minzip/tabiji)](https://www.npmjs.com/package/tabiji)
[![downloads](https://img.shields.io/npm/dm/tabiji)](https://www.npmjs.com/package/tabiji)

> 既存のテストランナーをラップし、フックとテスト間で**型安全な共有コンテキスト**を受け渡すための薄いライブラリです。

`beforeEach` で用意した値を `it` の中で使う、といったよくあるパターンでは、テスト外で宣言した `let` 変数を共有しがちです。`tabiji` はこの共有状態を型付きの `Context` に置き換え、`get` / `set` を通じて補完の効く安全なアクセスを提供します。ランナー自体は [Vitest](https://vitest.dev/) や [`bun:test`](https://bun.sh/docs/cli/test) など、お使いのものをそのまま利用します。

## Features

- 🔒 **型安全な共有コンテキスト** — コンテキストの形を型引数で宣言し、`get` / `set` を完全に型付け
- 🔌 **ランナー非依存** — Vitest・`bun:test` など `Runner` インターフェースを満たすランナーで動作
- 🔗 **チェイナブルな API** — フックや `describe` をメソッドチェーンで記述
- 🪶 **極小・ゼロ依存** — ランタイム依存なしの薄いラッパー

## Installation

```sh
# npm
npm install -D tabiji

# bun
bun add -D tabiji
```

テストランナー（Vitest など）は別途インストールしてください。`bun:test` を使う場合は追加インストール不要です。

## Usage

コンテキストの形を型引数として渡し、ランナーのモジュールを `Tabiji` に渡します。フックとテストのハンドラーには `Context` が引数として渡されます。

### Vitest

```ts
import * as vitest from 'vitest';
import { Tabiji } from 'tabiji';

type MyEnv = { count: number };

new Tabiji<MyEnv>(vitest)
  .beforeAll((c) => {
    c.set('count', 10);
  })
  .beforeEach((c) => {
    // 直前の値をもとに更新できる
    c.set('count', (prev) => prev + 1);
  })
  .describe('counter', ({ it }) => {
    it('increments before each test', (c) => {
      vitest.expect(c.get('count')).toBe(11);
    });
  });
```

### bun:test

ランナーを差し替えるだけで同じコードが動きます。

```ts
import * as bun from 'bun:test';
import { Tabiji } from 'tabiji';

type MyEnv = { count: number };

new Tabiji<MyEnv>(bun)
  .beforeAll((c) => {
    c.set('count', 10);
  })
  .beforeEach((c) => {
    c.set('count', (prev) => prev + 1);
  })
  .describe('counter', ({ it }) => {
    it('increments before each test', (c) => {
      bun.expect(c.get('count')).toBe(11);
    });
  });
```

## API

### `new Tabiji<C>(runner)`

`Tabiji` インスタンスを生成します。

- `C` — 共有コンテキストの形を表す型（`Record<string, unknown>`）。
- `runner` — `Runner` インターフェースを満たすテストランナー（例: `import * as vitest from 'vitest'`、`import * as bun from 'bun:test'`）。

### フック

いずれもチェイナブル（`this` を返す）で、ハンドラーは `Context<C>` を受け取ります。

| メソッド | 説明 |
| --- | --- |
| `.beforeAll(fn)` | 全テストの前に一度実行 |
| `.beforeEach(fn)` | 各テストの前に実行 |
| `.afterEach(fn)` | 各テストの後に実行 |
| `.afterAll(fn)` | 全テストの後に一度実行 |

### `.describe(name, (helpers) => void)`

テストグループを定義します。コールバックには以下のヘルパーが渡されます。

- `beforeEach` / `afterEach` / `beforeAll` / `afterAll` — グループ内のフック
- `describe(name, fn)` — ネストしたグループ
- `test(name, fn)` / `it(name, fn)` — テストケース（ハンドラーは `Context<C>` を受け取る）

### `Context<C>`

フック・テストのハンドラーに渡される型安全なストアです。

- `get(key)` — `key` に対応する値を取得（戻り値の型は `C[key]`）
- `set(key, value)` — 値を設定。`value` には直接値を渡すほか、`(prev) => next` の更新関数も渡せます

## Supported runners

`Runner` インターフェース（`beforeEach` / `afterEach` / `beforeAll` / `afterAll` / `describe` / `test` / `it` / `expect`）を満たすランナーで動作します。CI では以下を検証しています。

- [Vitest](https://vitest.dev/)
- [`bun:test`](https://bun.sh/docs/cli/test)

## License

[MIT](./LICENSE) © kazeusagi
