import { describe, it, expect } from 'vitest';
import { TEnclosure, EEnclosureType } from '@types';
import { capitalizeFirstLetter, extractThumbnailUrl } from './index';

describe('(Function) capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a lowercase word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should capitalize the first letter of an uppercase word', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should return an empty string if input is an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should capitalize the first letter and keep the rest of the string unchanged', () => {
    expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
  });

  it('should handle single character strings', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
    expect(capitalizeFirstLetter('A')).toBe('A');
  });
});

describe('(Function) extractThumbnailUrl', () => {
  it('should return the URL of the first image enclosure', () => {
    const enclosures: TEnclosure[] = [
      {
        type: EEnclosureType.Image,
        url: 'http://example.com/image1.jpg',
        length: 0,
      },
      {
        type: EEnclosureType.Video,
        url: 'http://example.com/video.mp4',
        length: 0,
      },
      {
        type: EEnclosureType.Image,
        url: 'http://example.com/image2.jpg',
        length: 0,
      },
    ];
    const result = extractThumbnailUrl(enclosures);
    expect(result).toBe('http://example.com/image1.jpg');
  });

  it('should return null if there are no image enclosures', () => {
    const enclosures: TEnclosure[] = [
      {
        type: EEnclosureType.Video,
        url: 'http://example.com/video.mp4',
        length: 0,
      },
      {
        type: EEnclosureType.Audio,
        url: 'http://example.com/audio.mp3',
        length: 0,
      },
    ];
    const result = extractThumbnailUrl(enclosures);
    expect(result).toBeNull();
  });

  it('should return null if enclosures array is empty', () => {
    const enclosures: TEnclosure[] = [];
    const result = extractThumbnailUrl(enclosures);
    expect(result).toBeNull();
  });

  it('should return null if enclosures is undefined', () => {
    const result = extractThumbnailUrl();
    expect(result).toBeNull();
  });
});
