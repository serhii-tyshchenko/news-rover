import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createProvidersController } from './providers.ts';

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

describe('(Controller) Providers', () => {
  it('returns providers when no search query', async () => {
    const mockProviders = [{ id: '1', name: 'Provider1' }];
    const controller = createProvidersController({
      getProviders: async () => mockProviders,
      getProviderById: async () => null,
      searchProviders: async () => [],
    });
    const { state, res } = createResponse();

    await controller.list({ query: {}, params: {} } as any, res as any);

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, mockProviders);
  });

  it('returns providers when search query is present', async () => {
    const mockProviders = [{ id: '2', name: 'NewsProvider' }];
    const controller = createProvidersController({
      getProviders: async () => [],
      getProviderById: async () => null,
      searchProviders: async (query: string) => {
        assert.equal(query, 'news');
        return mockProviders;
      },
    });
    const { state, res } = createResponse();

    await controller.list(
      { query: { search: 'news' }, params: {} } as any,
      res as any,
    );

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, mockProviders);
  });

  it('returns provider by id', async () => {
    const mockProvider = { id: '123', name: 'Provider123' };
    const controller = createProvidersController({
      getProviders: async () => [],
      getProviderById: async () => mockProvider,
      searchProviders: async () => [],
    });
    const { state, res } = createResponse();

    await controller.getById(
      { params: { id: '123' }, query: {} } as any,
      res as any,
    );

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, mockProvider);
  });

  it('returns 404 when provider is missing', async () => {
    const controller = createProvidersController({
      getProviders: async () => [],
      getProviderById: async () => null,
      searchProviders: async () => [],
    });
    const { state, res } = createResponse();

    await controller.getById(
      { params: { id: '404' }, query: {} } as any,
      res as any,
    );

    assert.equal(state.statusCode, 404);
    assert.deepEqual(state.payload, { error: 'Provider not found' });
  });
});
