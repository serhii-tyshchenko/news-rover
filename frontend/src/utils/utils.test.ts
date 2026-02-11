import { describe, expect, it } from 'vitest';

import { capitalizeFirstLetter } from './index';

describe('(Function) capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a lowercase word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should capitalize the first letter of an uppercase word', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should return an empty string if input is an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should capitalize the first letter and keep the rest of the string unchanged', () => {
    expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
  });

  it('should handle single character strings', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
    expect(capitalizeFirstLetter('A')).toBe('A');
  });
});
