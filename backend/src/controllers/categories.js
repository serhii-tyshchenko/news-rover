const { getCategories, getCategoryProviders } = require('../services/db');

module.exports = {
  async list(req, res) {
    try {
      const data = await getCategories();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await getCategoryProviders(id);
      if (!data) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};
