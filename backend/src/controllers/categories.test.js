const categoriesController = require('./categories');
const db = require('../services/db');

jest.mock('../services/db');

describe('(Controller) Categories', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return categories with status 200', async () => {
      const mockData = [{ id: 1, name: 'News' }];
      db.getCategories.mockResolvedValue(mockData);

      await categoriesController.list(req, res);

      expect(db.getCategories).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return status 500', async () => {
      db.getCategories.mockRejectedValue(new Error('DB error'));

      await categoriesController.list(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });

  describe('getById', () => {
    it('should return category providers with status 200', async () => {
      const mockProviders = [{ id: 1, provider: 'Provider1' }];
      req.params.id = '123';
      db.getCategoryProviders.mockResolvedValue(mockProviders);

      await categoriesController.getById(req, res);

      expect(db.getCategoryProviders).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProviders);
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '999';
      db.getCategoryProviders.mockResolvedValue(null);

      await categoriesController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    it('should handle errors and return status 500', async () => {
      req.params.id = '123';
      db.getCategoryProviders.mockRejectedValue(new Error('DB error'));

      await categoriesController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
});
