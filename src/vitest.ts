import { beforeEach, describe, it } from 'vitest';
import type { Runner } from '../types';
export const vitestRunner: Runner = { describe, it, beforeEach };
