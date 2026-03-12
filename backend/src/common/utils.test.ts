import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  normalizeDate,
  normalizeDescription,
  normalizeTitle,
  transformData,
} from './utils.ts';

describe('normalizeTitle', () => {
  it('trims and normalizes unicode', () => {
    assert.equal(normalizeTitle('  Тест  '), 'Тест');
  });
});

describe('normalizeDescription', () => {
  it('strips HTML tags', () => {
    assert.equal(normalizeDescription('<b>Bold</b> text'), 'Bold text');
  });

  it('truncates long descriptions and adds ...', () => {
    const long = 'a'.repeat(251);
    assert.equal(normalizeDescription(long), `${'a'.repeat(250)}...`);
  });

  it('does not add ... if already present', () => {
    const desc = `${'a'.repeat(247)}...`;
    assert.equal(normalizeDescription(desc), desc);
  });
});

describe('normalizeDate', () => {
  it('replaces Ukrainian/Russian day and month names', () => {
    assert.equal(normalizeDate('пн, 1 січ 2024'), 'Mon, 1 Jan 2024');
    assert.equal(normalizeDate('вт, 2 фев 2024'), 'Tue, 2 Feb 2024');
  });
});

describe('transformData', () => {
  it('decodes HTML entities and removes newlines from description', () => {
    const items = [
      {
        title: 'Test &amp; Title ',
        link: 'http://example.com',
        created: '2024-01-01',
        enclosures: [],
        description: 'Desc &lt;b&gt;bold&lt;/b&gt;\nwith newline\n',
      },
    ];

    assert.deepEqual(transformData(items, 1), [
      {
        title: 'Test & Title',
        link: 'http://example.com',
        created: '2024-01-01',
        enclosures: [],
        description: 'Desc <b>bold</b>with newline',
      },
    ]);
  });

  it('limits the number of items returned', () => {
    const items = [
      { title: '1', link: '', created: '', enclosures: [], description: 'a' },
      { title: '2', link: '', created: '', enclosures: [], description: 'b' },
      { title: '3', link: '', created: '', enclosures: [], description: 'c' },
    ];

    const result = transformData(items, 2);
    assert.equal(result.length, 2);
    assert.equal(result[0].title, '1');
    assert.equal(result[1].title, '2');
  });

  it('handles empty items array', () => {
    assert.deepEqual(transformData([]), []);
  });
});
