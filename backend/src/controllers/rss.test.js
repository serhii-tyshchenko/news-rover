jest.mock('../services/db');
const rssController = require('./rss');
const parse = require('../parse');
const { transformData } = require('../common/utils');
const { getProviderById } = require('../services/db');

jest.mock('../parse');
jest.mock('../common/utils');

describe('rssController.retrieve', () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        limit: 5,
        url: encodeURIComponent('http://example.com/rss'),
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return transformed data and count on success', async () => {
    const fakeItems = [{ title: 'a' }, { title: 'b' }];
    parse.mockResolvedValue({ items: fakeItems });
    transformData.mockReturnValue(['transformed']);

    await rssController.retrieve(req, res);

    expect(parse).toHaveBeenCalledWith('http://example.com/rss');
    expect(transformData).toHaveBeenCalledWith(fakeItems, 5);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: ['transformed'],
      count: 2,
    });
  });

  it('should handle missing response or items', async () => {
    parse.mockResolvedValue(null);

    await rssController.retrieve(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to fetch RSS feed',
    });

    parse.mockResolvedValue({});
    await rssController.retrieve(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to fetch RSS feed',
    });
  });

  it('should handle errors thrown in try block', async () => {
    const error = new Error('fail');
    parse.mockRejectedValue(error);

    // Mock console.error to suppress error output in test
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await rssController.retrieve(req, res);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });

    console.error.mockRestore();
  });

  it('should decode the url from query', async () => {
    req.query.url = encodeURIComponent('http://test.com/feed');
    parse.mockResolvedValue({ items: [] });
    transformData.mockReturnValue([]);

    await rssController.retrieve(req, res);

    expect(parse).toHaveBeenCalledWith('http://test.com/feed');
  });
  // jest.mock('../services/db'); // Already hoisted to the top, do not mock here
  jest.mock('../services/db');

  describe('rssController.providerNews', () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: { id: 'provider1' },
        query: { limit: 3 },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should return transformed data and count on success', async () => {
      const fakeProvider = { url: 'http://provider.com/rss' };
      const fakeItems = [{ title: 'x' }, { title: 'y' }];
      getProviderById.mockResolvedValue(fakeProvider);
      parse.mockResolvedValue({ items: fakeItems });
      transformData.mockReturnValue(['transformed']);

      await rssController.providerNews(req, res);

      expect(getProviderById).toHaveBeenCalledWith('provider1');
      expect(parse).toHaveBeenCalledWith('http://provider.com/rss');
      expect(transformData).toHaveBeenCalledWith(fakeItems, 3);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: ['transformed'],
        count: 2,
      });
    });

    it('should return 404 if provider not found', async () => {
      getProviderById.mockResolvedValue(null);

      await rssController.providerNews(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Provider not found or missing URL',
      });
    });

    it('should return 404 if provider has no url', async () => {
      getProviderById.mockResolvedValue({});

      await rssController.providerNews(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Provider not found or missing URL',
      });
    });

    it('should return 500 if parse returns null or no items', async () => {
      getProviderById.mockResolvedValue({ url: 'http://provider.com/rss' });
      parse.mockResolvedValue(null);

      await rssController.providerNews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch RSS feed',
      });

      parse.mockResolvedValue({});
      await rssController.providerNews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch RSS feed',
      });
    });

    it('should handle errors thrown in try block', async () => {
      const error = new Error('fail');
      getProviderById.mockRejectedValue(error);

      jest.spyOn(console, 'error').mockImplementation(() => {});

      await rssController.providerNews(req, res);

      expect(console.error).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });

      console.error.mockRestore();
    });

    it('should use limit from query and call transformData with it', async () => {
      req.query.limit = 10;
      const fakeProvider = { url: 'http://provider.com/rss' };
      const fakeItems = [{ title: 'a' }];
      getProviderById.mockResolvedValue(fakeProvider);
      parse.mockResolvedValue({ items: fakeItems });
      transformData.mockReturnValue(['transformed']);

      await rssController.providerNews(req, res);

      expect(transformData).toHaveBeenCalledWith(fakeItems, 10);
    });
  });
});
