import { describe, expect, it } from 'vitest';

import { EEnclosureType, TEnclosure } from '@types';

import { extractThumbnailUrl, formatNewsResponse } from './api';

describe('extractThumbnailUrl', () => {
  it('should return the URL of the first image enclosure', () => {
    const enclosures: TEnclosure[] = [
      {
        type: EEnclosureType.Video,
        url: 'http://example.com/video.mp4',
        length: 0,
      },
      {
        type: EEnclosureType.Image,
        url: 'http://example.com/image1.jpg',
        length: 12345,
      },
      {
        type: EEnclosureType.Image,
        url: 'http://example.com/image2.jpg',
        length: 67890,
      },
    ];
    const result = extractThumbnailUrl(enclosures);
    expect(result).toBe('http://example.com/image1.jpg');
  });

  it('should return null if no image enclosures are present', () => {
    const enclosures: TEnclosure[] = [
      {
        type: EEnclosureType.Video,
        url: 'http://example.com/video.mp4',
        length: 12345,
      },
    ];
    const result = extractThumbnailUrl(enclosures);
    expect(result).toBeNull();
  });

  it('should return null if enclosures array is empty', () => {
    const result = extractThumbnailUrl([]);
    expect(result).toBeNull();
  });

  it('should return null if enclosures is undefined', () => {
    const result = extractThumbnailUrl();
    expect(result).toBeNull();
  });
});

describe('formatNewsResponse', () => {
  it('should format the raw data correctly', () => {
    const rawData = {
      data: [
        {
          created: '2023-01-01',
          title: 'News Title 1',
          link: 'http://example.com/news1',
          enclosures: [
            {
              type: EEnclosureType.Image,
              url: 'http://example.com/image1.jpg',
            },
          ],
        },
        {
          created: '2023-01-02',
          title: 'News Title 2',
          link: 'http://example.com/news2',
          enclosures: [],
        },
      ],
      count: 2,
    };

    const result = formatNewsResponse(rawData);

    expect(result).toEqual({
      data: [
        {
          created: '2023-01-01',
          title: 'News Title 1',
          link: 'http://example.com/news1',
          thumbnail: 'http://example.com/image1.jpg',
        },
        {
          created: '2023-01-02',
          title: 'News Title 2',
          link: 'http://example.com/news2',
          thumbnail: null,
        },
      ],
      count: 2,
    });
  });

  it('should handle empty data array', () => {
    const rawData = {
      data: [],
      count: 0,
    };

    const result = formatNewsResponse(rawData);

    expect(result).toEqual({
      data: [],
      count: 0,
    });
  });
});
