import { expect, describe, it } from 'vitest';
import { formatDate } from './format-date';

describe('(Function) formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2022-01-01T00:00:00.000Z');
    expect(formatDate(date)).toEqual('1/1');
  });

  it('should format a different date correctly', () => {
    const date = new Date('2022-02-14T00:00:00.000Z');
    expect(formatDate(date)).toEqual('14/2');
  });
});
