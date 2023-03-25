import isEmpty from './isEmpty';

describe('isEmpty', () => {
  it('returns true if array is empty', () => {
    expect(isEmpty([])).toBe(true);
  });
  it('returns false if array is not empty', () => {
    expect(isEmpty([1])).toBe(false);
  });

  it('returns false if argument is not an array', () => {
    expect(isEmpty(123)).toBe(false);
  });
});
