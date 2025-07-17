/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  DEFAULT_POSTS_LIMIT,
  NEWS_ROOT_URL,
  PROVIDERS_ROOT_URL,
} from '@constants';
import { formatNewsResponse, isValidResponse } from '@utils';

import { getNewsByProvider, getProviders } from './index';

vi.mock('@constants', () => ({
  DEFAULT_POSTS_LIMIT: 10,
  NEWS_ROOT_URL: 'https://news.api/news',
  PROVIDERS_ROOT_URL: 'https://news.api/providers',
}));
vi.mock('@utils', () => ({
  isValidResponse: vi.fn(),
  formatNewsResponse: vi.fn(),
}));

describe('api/index', () => {
  const mockFetch = vi.fn();
  const globalAny: any = global;

  beforeEach(() => {
    globalAny.fetch = mockFetch;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getProviders', () => {
    it('should fetch providers and return data on valid response', async () => {
      const mockData = [{ id: 1, name: 'Provider' }];
      (isValidResponse as any).mockReturnValue(true);
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockData),
      });

      const result = await getProviders();

      expect(mockFetch).toHaveBeenCalledWith('https://news.api/providers');
      expect(isValidResponse).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('should throw error on invalid response', async () => {
      (isValidResponse as any).mockReturnValue(false);
      mockFetch.mockResolvedValue({});

      await expect(getProviders()).rejects.toThrow('Error fetching providers');
    });
  });

  describe('getNewsByProvider', () => {
    it('should fetch news and return formatted data on valid response', async () => {
      const url = 'provider-url';
      const limit = 5;
      const mockData = [{ id: 1, title: 'News' }];
      const formattedData = [{ id: 1, title: 'Formatted News' }];
      (isValidResponse as any).mockReturnValue(true);
      (formatNewsResponse as any).mockReturnValue(formattedData);
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockData),
      });

      const result = await getNewsByProvider(url, limit);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://news.api/news?url=${url}&limit=${limit}`,
      );
      expect(isValidResponse).toHaveBeenCalled();
      expect(formatNewsResponse).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(formattedData);
    });

    it('should use default limit if not provided', async () => {
      const url = 'provider-url';
      const mockData = [{ id: 1 }];
      const formattedData = [{ id: 1 }];
      (isValidResponse as any).mockReturnValue(true);
      (formatNewsResponse as any).mockReturnValue(formattedData);
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockData),
      });

      await getNewsByProvider(url);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://news.api/news?url=${url}&limit=10`,
      );
    });

    it('should throw error on invalid response', async () => {
      (isValidResponse as any).mockReturnValue(false);
      mockFetch.mockResolvedValue({});

      await expect(getNewsByProvider('url')).rejects.toThrow(
        'Error fetching news',
      );
    });
  });
});
