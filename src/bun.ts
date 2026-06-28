import { beforeEach, describe, it } from 'bun:test';
import type { Runner } from '../types';
export const bunRunner: Runner = { describe, it, beforeEach };
