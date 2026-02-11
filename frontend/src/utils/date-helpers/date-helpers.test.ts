import { describe, expect, it } from 'vitest';

import { ELocale, TDic, TNewsItem } from '@types';
import { capitalizeFirstLetter } from '@utils';

import {
  formatTime,
  getDateLabel,
  groupDataByDay,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
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
  const dic = { today: 'Today', yesterday: 'Yesterday' } as TDic;
  it('should group data by day', () => {
    const data = [
      {
        created: new Date('2022-01-01T12:00:00').getTime(),
        title: 'Title 1',
        link: 'link1',
        thumbnail: 'thumbnail1',
      },
      {
        created: new Date('2022-01-02T12:10:00').getTime(),
        title: 'Title 2',
        link: 'link2',
        thumbnail: 'thumbnail2',
      },
      {
        created: new Date('2022-01-02T12:15:00').getTime(),
        title: 'Title 3',
        link: 'link3',
        thumbnail: 'thumbnail3',
      },
    ] as TNewsItem[];

    expect(groupDataByDay(data, dic, ELocale.EnUS)).toEqual({
      'January 1, 2022': [
        {
          created: new Date('2022-01-01T12:00:00').getTime(),
          title: 'Title 1',
          link: 'link1',
          thumbnail: 'thumbnail1',
        },
      ],
      'January 2, 2022': [
        {
          created: new Date('2022-01-02T12:15:00').getTime(),
          title: 'Title 3',
          link: 'link3',
          thumbnail: 'thumbnail3',
        },
        {
          created: new Date('2022-01-02T12:10:00').getTime(),
          title: 'Title 2',
          link: 'link2',
          thumbnail: 'thumbnail2',
        },
      ],
    });
  });
});

describe('(Function) getDateLabel', () => {
  const dic = { today: 'Today', yesterday: 'Yesterday' } as TDic;
  const locale = ELocale.EnUS;

  it('should return today label for today', () => {
    const date = new Date();
    expect(getDateLabel(date, dic, locale)).toBe(dic.today);
  });

  it('should return yesterday label for yesterday', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(getDateLabel(date, dic, locale)).toBe(dic.yesterday);
  });

  it('should return weekday name for dates in this week', () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const testDate = new Date(startOfWeek);
    testDate.setDate(startOfWeek.getDate() + 3);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
      testDate.getDate() === today.getDate() &&
      testDate.getMonth() === today.getMonth() &&
      testDate.getFullYear() === today.getFullYear()
    ) {
      testDate.setDate(startOfWeek.getDate() + 2);
    }
    if (
      testDate.getDate() === yesterday.getDate() &&
      testDate.getMonth() === yesterday.getMonth() &&
      testDate.getFullYear() === yesterday.getFullYear()
    ) {
      testDate.setDate(startOfWeek.getDate() + 4);
    }

    const expected = capitalizeFirstLetter(
      testDate.toLocaleDateString(locale, { weekday: 'long' }),
    );
    expect(getDateLabel(testDate, dic, locale)).toBe(expected);
  });

  it('should return month, day and year for dates not this year', () => {
    const now = new Date();
    const d = new Date(now);
    d.setFullYear(now.getFullYear() - 1);
    d.setMonth(0);
    d.setDate(1);
    d.setHours(12, 0, 0, 0);

    const expected = capitalizeFirstLetter(
      d.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    );
    expect(getDateLabel(d, dic, locale)).toBe(expected);
  });
});
