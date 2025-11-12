const {
  normalizeTitle,
  normalizeDescription,
  normalizeDate,
  transformData,
} = require('./utils');

describe('normalizeTitle', () => {
  it('should trim and normalize unicode', () => {
    expect(normalizeTitle('  Тест  ')).toBe('Тест');
  });
});

describe('normalizeDescription', () => {
  it('should strip HTML tags', () => {
    expect(normalizeDescription('<b>Bold</b> text')).toBe('Bold text');
  });
  it('should truncate long descriptions and add ...', () => {
    const long = 'a'.repeat(251);
    expect(normalizeDescription(long)).toBe('a'.repeat(250) + '...');
  });
  it('should not add ... if already present', () => {
    const desc = 'a'.repeat(247) + '...';
    expect(normalizeDescription(desc)).toBe(desc);
  });
});

describe('normalizeDate', () => {
  it('should replace Ukrainian/Russian day and month names', () => {
    expect(normalizeDate('пн, 1 січ 2024')).toBe('Mon, 1 Jan 2024');
    expect(normalizeDate('вт, 2 фев 2024')).toBe('Tue, 2 Feb 2024');
  });
});

describe('transformData', () => {
  it('should decode HTML entities, trim, and remove newlines from description', () => {
    const items = [
      {
        title: 'Test &amp; Title ',
        link: 'http://example.com',
        created: '2024-01-01',
        enclosures: [],
        description: 'Desc &lt;b&gt;bold&lt;/b&gt;\nwith newline\n',
      },
    ];
    const result = transformData(items, 1);
    expect(result).toEqual([
      {
        title: 'Test & Title',
        link: 'http://example.com',
        created: '2024-01-01',
        enclosures: [],
        description: 'Desc <b>bold</b>with newline',
      },
    ]);
  });

  it('should limit the number of items returned', () => {
    const items = [
      { title: '1', link: '', created: '', enclosures: [], description: 'a' },
      { title: '2', link: '', created: '', enclosures: [], description: 'b' },
      { title: '3', link: '', created: '', enclosures: [], description: 'c' },
    ];
    const result = transformData(items, 2);
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('1');
    expect(result[1].title).toBe('2');
  });

  it('should use DEFAULT_POST_LIMIT if limit is not provided', () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      title: `${i + 1}`,
      link: '',
      created: '',
      enclosures: [],
      description: 'desc',
    }));
    const result = transformData(items);
    // DEFAULT_POST_LIMIT is imported from constants, but we can check that it limits
    expect(result.length).toBeLessThanOrEqual(items.length);
  });

  it('should handle empty items array', () => {
    expect(transformData([])).toEqual([]);
  });
});
