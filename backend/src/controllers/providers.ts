import type { Request, Response } from 'express';
import {
  getProviders,
  getProviderById,
  searchProviders,
} from '../services/db.ts';

type ProvidersDeps = {
  getProviders: typeof getProviders;
  getProviderById: typeof getProviderById;
  searchProviders: typeof searchProviders;
};

export function createProvidersController(deps: ProvidersDeps) {
  return {
    async list(req: Request, res: Response) {
      try {
        const { search } = req.query;
        const query = typeof search === 'string' ? search : '';
        const data = query
          ? await deps.searchProviders(query)
          : await deps.getProviders();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
    },
    async getById(req: Request, res: Response) {
      try {
        const rawId = req.params.id;
        const id = Array.isArray(rawId) ? rawId[0] : rawId;
        const data = await deps.getProviderById(id);
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
}

const providersController = createProvidersController({
  getProviders,
  getProviderById,
  searchProviders,
});

export default providersController;
