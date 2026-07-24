import { describe, expect, it } from 'vitest';

import { greet } from './greeting.service.js';

describe('greet', () => {
  it('chào đúng tên', () => {
    expect(greet('Duotech')).toBe('Xin chào, Duotech!');
  });
});
