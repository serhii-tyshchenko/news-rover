const providersController = require('./providers');
const db = require('../services/db');

jest.mock('../services/db');

describe('(Controller) Providers', () => {
  let req, res;

  beforeEach(() => {
    req = { query: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return providers when no search query', async () => {
      const mockProviders = [{ id: 1, name: 'Provider1' }];
      db.getProviders.mockResolvedValue(mockProviders);

      await providersController.list(req, res);

      expect(db.getProviders).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProviders);
    });

    it('should return providers when search query is present', async () => {
      req.query.search = 'news';
      const mockProviders = [{ id: 2, name: 'NewsProvider' }];
      db.searchProviders.mockResolvedValue(mockProviders);

      await providersController.list(req, res);

      expect(db.searchProviders).toHaveBeenCalledWith('news');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProviders);
    });

    it('should handle errors and return 500', async () => {
      db.getProviders.mockRejectedValue(new Error('DB error'));

      await providersController.list(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });

  describe('getById', () => {
    it('should return provider by id', async () => {
      req.params.id = '123';
      const mockProvider = { id: '123', name: 'Provider123' };
      db.getProviderById.mockResolvedValue(mockProvider);

      await providersController.getById(req, res);

      expect(db.getProviderById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProvider);
    });

    it('should return 404 if provider not found', async () => {
      req.params.id = '999';
      db.getProviderById.mockResolvedValue(null);

      await providersController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Provider not found' });
    });

    it('should handle errors and return 500', async () => {
      req.params.id = '123';
      db.getProviderById.mockRejectedValue(new Error('DB error'));

      await providersController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
});
