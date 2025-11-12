const {
  getProviders,
  getProviderById,
  searchProviders,
} = require('../services/db');

module.exports = {
  async list(req, res) {
    try {
      const { search } = req.query;
      const data = search
        ? await searchProviders(search)
        : await getProviders();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await getProviderById(id);
      if (!data) {
        return res.status(404).json({ error: 'Provider not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};
