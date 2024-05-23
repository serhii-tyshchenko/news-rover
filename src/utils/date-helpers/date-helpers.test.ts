import { expect, describe, it } from 'vitest';
import { formatDate, formatTime, isToday, isYesterday } from './date-helpers';

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

describe('(Function) formatTime', () => {
  it('should format a date with hours and minutes', () => {
    const date = new Date('2022-01-01T12:34:56').getTime();
    expect(formatTime(date)).toEqual('12:34');
  });

  it('should format a date with single digit hours and minutes', () => {
    const date = new Date('2022-01-01T05:06:07').getTime();
    expect(formatTime(date)).toEqual('05:06');
  });

  it('should format a date with leading zeros', () => {
    const date = new Date('2022-01-01T00:00:00').getTime();
    expect(formatTime(date)).toEqual('00:00');
  });
});

describe('(Function) isToday', () => {
  it('should return true when the given date is today', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);
  });

  it('should return false when the given date is not today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isToday(yesterday)).toBe(false);
  });
});

describe('(Function) isYesterday', () => {
  it('should return true when the given date is yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isYesterday(yesterday)).toBe(true);
  });

  it('should return false when the given date is not yesterday', () => {
    const today = new Date();
    expect(isYesterday(today)).toBe(false);
  });
});
