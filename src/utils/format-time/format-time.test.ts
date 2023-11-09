import { expect, describe, it } from 'vitest';
import { formatTime } from './format-time';

describe('formatTime', () => {
  it('should format a date with hours and minutes', () => {
    const date = new Date('2022-01-01T12:34:56');
    expect(formatTime(date)).toEqual('12:34');
  });

  it('should format a date with single digit hours and minutes', () => {
    const date = new Date('2022-01-01T05:06:07');
    expect(formatTime(date)).toEqual('05:06');
  });

  it('should format a date with leading zeros', () => {
    const date = new Date('2022-01-01T00:00:00');
    expect(formatTime(date)).toEqual('00:00');
  });
});
