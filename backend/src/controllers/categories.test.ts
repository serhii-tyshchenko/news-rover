import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createCategoriesController } from './categories.ts';

function createResponse() {
  const state: { statusCode: number; payload: unknown } = {
    statusCode: 200,
    payload: null,
  };

  const res = {
    status(code: number) {
      state.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      state.payload = payload;
      return this;
    },
  };

  return { state, res };
}

describe('(Controller) Categories', () => {
  it('returns categories with status 200', async () => {
    const categories = ['News', 'Tech'];
    const controller = createCategoriesController({
      getCategories: async () => categories,
      getCategoryProviders: async () => [],
    });
    const { state, res } = createResponse();

    await controller.list({ params: {}, query: {} } as any, res as any);

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, categories);
  });

  it('returns category providers with status 200', async () => {
    const providers = [{ id: '1', provider: 'Provider1' }];
    const controller = createCategoriesController({
      getCategories: async () => [],
      getCategoryProviders: async (id: string) => {
        assert.equal(id, '123');
        return providers as any[];
      },
    });
    const { state, res } = createResponse();

    await controller.getById(
      { params: { id: '123' }, query: {} } as any,
      res as any,
    );

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, providers);
  });
});
