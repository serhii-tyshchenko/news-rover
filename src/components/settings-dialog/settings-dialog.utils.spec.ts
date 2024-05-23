import { expect, describe, it } from 'vitest';

import { prepareOptions } from './settings-dialog.utils';

describe('(Function) prepareOptions', () => {
  it('should return an empty array when an empty object is passed', () => {
    expect(prepareOptions({})).toEqual([]);
  });

  it('should return an array of options with correct values and labels', () => {
    const input = {
      option1: 'value1',
      option2: 'value2',
      option3: 'value3',
    };

    const expectedOutput = [
      { value: 'value1', label: 'VALUE1' },
      { value: 'value2', label: 'VALUE2' },
      { value: 'value3', label: 'VALUE3' },
    ];

    expect(prepareOptions(input)).toEqual(expectedOutput);
  });
});
