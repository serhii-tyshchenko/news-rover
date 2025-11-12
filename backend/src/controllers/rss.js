const parse = require('../parse');
const { getProviderById } = require('../services/db');
const { transformData } = require('../common/utils');

module.exports = {
  async retrieve(req, res) {
    try {
      const postLimit = req.query.limit;
      const url = decodeURIComponent(req.query.url);

      const response = await parse(url);

      if (!response || !response.items) {
        return res.status(500).json({ error: 'Failed to fetch RSS feed' });
      }

      const data = transformData(response.items, postLimit);

      return res.status(200).json({
        data,
        count: response?.items.length || 0,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },
  async providerNews(req, res) {
    try {
      const { id } = req.params;
      const provider = await getProviderById(id);
      if (!provider || !provider.url) {
        return res
          .status(404)
          .json({ error: 'Provider not found or missing URL' });
      }

      const response = await parse(provider.url);

      if (!response || !response.items) {
        return res.status(500).json({ error: 'Failed to fetch RSS feed' });
      }

      const postLimit = req.query.limit;
      const data = transformData(response.items, postLimit);

      return res.status(200).json({
        data,
        count: response?.items.length || 0,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },
};
