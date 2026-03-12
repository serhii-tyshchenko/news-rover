import type { Request, Response } from 'express';
import { transformData } from '../common/utils.ts';
import parse from '../parse.ts';
import { getProviderById } from '../services/db.ts';

type RssDeps = {
  parse: typeof parse;
  getProviderById: typeof getProviderById;
  transformData: typeof transformData;
};

export function createRssController(deps: RssDeps) {
  return {
    async retrieve(req: Request, res: Response) {
      try {
        const postLimit = req.query.limit;
        const encodedUrl =
          typeof req.query.url === 'string' ? req.query.url : '';
        const url = decodeURIComponent(encodedUrl);

        const response = await deps.parse(url);

        if (!response || !response.items) {
          return res.status(500).json({ error: 'Failed to fetch RSS feed' });
        }

        const data = deps.transformData(
          response.items,
          Number(postLimit) || undefined,
        );

        return res.status(200).json({
          data,
          count: response?.items.length || 0,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
      }
    },
    async providerNews(req: Request, res: Response) {
      try {
        const rawId = req.params.id;
        const id = Array.isArray(rawId) ? rawId[0] : rawId;
        const provider = await deps.getProviderById(id);
        if (!provider || !provider.url) {
          return res
            .status(404)
            .json({ error: 'Provider not found or missing URL' });
        }

        const response = await deps.parse(provider.url);

        if (!response || !response.items) {
          return res.status(500).json({ error: 'Failed to fetch RSS feed' });
        }

        const postLimit = req.query.limit;
        const data = deps.transformData(
          response.items,
          Number(postLimit) || undefined,
        );

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
}

const rssController = createRssController({
  parse,
  getProviderById,
  transformData,
});

export default rssController;
