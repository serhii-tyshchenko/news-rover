import type { Request, Response } from 'express';
import { getCategories, getCategoryProviders } from '../services/db.ts';

type CategoriesDeps = {
  getCategories: typeof getCategories;
  getCategoryProviders: typeof getCategoryProviders;
};

export function createCategoriesController(deps: CategoriesDeps) {
  return {
    async list(_: Request, res: Response) {
      try {
        const data = await deps.getCategories();
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
        const data = await deps.getCategoryProviders(id);
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
}

const categoriesController = createCategoriesController({
  getCategories,
  getCategoryProviders,
});

export default categoriesController;
