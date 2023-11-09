import { expect, describe, it } from 'vitest';
import { LANGUAGES } from '@constants';
import { prepareOptions } from './language-selector.utils';

describe('prepareOptions', () => {
  it('should return an array of options with correct values and labels', () => {
    const options = prepareOptions();
    expect(options).toHaveLength(Object.values(LANGUAGES).length);
    options.forEach((option, index) => {
      expect(option.value).toEqual(Object.values(LANGUAGES)[index]);
      expect(option.label).toEqual(
        Object.values(LANGUAGES)[index].toUpperCase()
      );
    });
  });
});
