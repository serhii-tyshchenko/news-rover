import getClassName from './getClassName';

it('returns empty string if no args passed', () => {
  expect(getClassName()).toBe('');
});
it('should accept object as arg', () => {
  expect(getClassName('class1', { class2: true })).toBe('class1 class2');
});
it('should accept array as arg', () => {
  expect(getClassName(['class1', 'class2'])).toBe('class1 class2');
});
it('concats strings with space', () => {
  expect(getClassName('class1', 'class2')).toBe('class1 class2');
});

it('ignores empty strings', () => {
  expect(getClassName('class1', '')).toBe('class1');
});
