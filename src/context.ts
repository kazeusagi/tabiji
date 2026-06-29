export type ContextShape = Record<string, unknown>;

export class Context<C extends ContextShape> {
  private store = new Map<string, unknown>();

  get<K extends keyof C>(key: K): C[K] {
    return this.store.get(key as string) as C[K];
  }
  set<K extends keyof C>(key: K, value: C[K] | ((prev: C[K]) => C[K])): void {
    const next =
      typeof value === 'function' ? (value as (prev: C[K]) => C[K])(this.get(key)) : value;
    this.store.set(key as string, next);
  }
}
