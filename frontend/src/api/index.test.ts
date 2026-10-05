import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatNewsResponse, isValidResponse } from '#utils';

import { getNewsByProvider, getProviders } from './index';

vi.mock('#constants', () => ({
  DEFAULT_POSTS_LIMIT: 10,
  PROVIDERS_ROOT_URL: 'https://news.api/providers',
}));
vi.mock('#utils', () => ({
  isValidResponse: vi.fn(),
  formatNewsResponse: vi.fn(),
}));

describe('api/index', () => {
  const mockFetch = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  describe('getProviders', () => {
    it('should fetch providers and return data on valid response', async () => {
      const mockData = [{ id: 1, name: 'Provider' }];
      vi.mocked(isValidResponse).mockReturnValue(true);
      mockFetch.mockResolvedValue({
        ...new Response(JSON.stringify(mockData)),
        json: () => Promise.resolve(mockData),
      } as Response);

      const result = await getProviders();

      expect(mockFetch).toHaveBeenCalledWith('https://news.api/providers');
      expect(isValidResponse).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('should throw error on invalid response', async () => {
      vi.mocked(isValidResponse).mockReturnValue(false);
      mockFetch.mockResolvedValue(new Response(null, { status: 500 }));

      await expect(getProviders()).rejects.toThrow('Error fetching providers');
    });
  });

  describe('getNewsByProvider', () => {
    it('should fetch news and return formatted data on valid response', async () => {
      const id = 'provider-id';
      const limit = 5;
      const mockData = { data: [], count: 0 };
      const formattedData = { data: [], count: 0 };
      vi.mocked(isValidResponse).mockReturnValue(true);
      vi.mocked(formatNewsResponse).mockReturnValue(formattedData);
      mockFetch.mockResolvedValue({
        ...new Response(JSON.stringify(mockData)),
        json: () => Promise.resolve(mockData),
      } as Response);

      const result = await getNewsByProvider(id, limit);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://news.api/providers/${id}/news?limit=${limit}`,
      );
      expect(isValidResponse).toHaveBeenCalled();
      expect(formatNewsResponse).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(formattedData);
    });

    it('should use default limit if not provided', async () => {
      const id = 'provider-id';
      const mockData = { data: [], count: 0 };
      const formattedData = { data: [], count: 0 };
      vi.mocked(isValidResponse).mockReturnValue(true);
      vi.mocked(formatNewsResponse).mockReturnValue(formattedData);
      mockFetch.mockResolvedValue({
        ...new Response(JSON.stringify(mockData)),
        json: () => Promise.resolve(mockData),
      } as Response);

      await getNewsByProvider(id);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://news.api/providers/${id}/news?limit=10`,
      );
    });

    it('should throw error on invalid response', async () => {
      vi.mocked(isValidResponse).mockReturnValue(false);
      mockFetch.mockResolvedValue(new Response(null, { status: 500 }));

      await expect(getNewsByProvider('url')).rejects.toThrow(
        'Error fetching news',
      );
    });
  });
});
