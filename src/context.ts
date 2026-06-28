import type { ContextShape } from './types';

export class Context<C extends ContextShape> {
  private store = new Map<string, unknown>();

  get<K extends keyof C>(key: K): C[K] {
    return this.store.get(key as string) as C[K];
  }
  set<K extends keyof C>(key: K, value: C[K]): void {
    this.store.set(key as string, value);
  }
}
