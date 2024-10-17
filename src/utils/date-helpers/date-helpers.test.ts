import { expect, describe, it } from 'vitest';
import {
  formatTime,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  groupDataByDay,
} from './date-helpers';

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

describe('(Function) isThisYear', () => {
  it('should return true when the given date is in the current year', () => {
    const date = new Date();
    expect(isThisYear(date)).toBe(true);
  });

  it('should return false when the given date is not in the current year', () => {
    const date = new Date('2021-01-01');
    expect(isThisYear(date)).toBe(false);
  });
});

describe('(Function) isThisWeek', () => {
  it('should return true when the given date is within the last 7 days', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isThisWeek(yesterday)).toBe(true);
  });

  it('should return false when the given date is not within the last 7 days', () => {
    const date = new Date('2022-01-01');
    expect(isThisWeek(date)).toBe(false);
  });
});

describe('(Function) groupDataByDay', () => {
  it('should group data by day', () => {
    const data = [
      {
        created: new Date('2022-01-01T12:00:00').getTime(),
        title: 'Title 1',
        link: 'link1',
      },
      {
        created: new Date('2022-01-02T12:10:00').getTime(),
        title: 'Title 2',
        link: 'link2',
      },
      {
        created: new Date('2022-01-02T12:15:00').getTime(),
        title: 'Title 3',
        link: 'link3',
      },
    ];
    expect(groupDataByDay(data)).toEqual({
      '01.01.2022': [
        {
          created: new Date('2022-01-01T12:00:00').getTime(),
          title: 'Title 1',
          link: 'link1',
        },
      ],
      '02.01.2022': [
        {
          created: new Date('2022-01-02T12:15:00').getTime(),
          title: 'Title 3',
          link: 'link3',
        },
        {
          created: new Date('2022-01-02T12:10:00').getTime(),
          title: 'Title 2',
          link: 'link2',
        },
      ],
    });
  });
});
