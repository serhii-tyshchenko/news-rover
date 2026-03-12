import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createRssController } from './rss.ts';

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

describe('(Controller) RSS', () => {
  it('retrieve returns transformed data and count', async () => {
    const fakeItems = [{ title: 'a' }, { title: 'b' }];
    const controller = createRssController({
      parse: async (url: string) => {
        assert.equal(url, 'http://example.com/rss');
        return { items: fakeItems } as any;
      },
      getProviderById: async () => null,
      transformData: (items, limit) => {
        assert.deepEqual(items, fakeItems as any);
        assert.equal(limit, 5);
        return [
          {
            title: 'transformed',
            link: '',
            created: '',
            enclosures: [],
            description: '',
          },
        ];
      },
    });
    const { state, res } = createResponse();

    await controller.retrieve(
      {
        query: { limit: 5, url: encodeURIComponent('http://example.com/rss') },
        params: {},
      } as any,
      res as any,
    );

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, {
      data: [
        {
          title: 'transformed',
          link: '',
          created: '',
          enclosures: [],
          description: '',
        },
      ],
      count: 2,
    });
  });

  it('providerNews returns 404 when provider is missing', async () => {
    const controller = createRssController({
      parse: async () => null,
      getProviderById: async () => null,
      transformData: () => [],
    });
    const { state, res } = createResponse();

    await controller.providerNews(
      { params: { id: 'provider1' }, query: { limit: 3 } } as any,
      res as any,
    );

    assert.equal(state.statusCode, 404);
    assert.deepEqual(state.payload, {
      error: 'Provider not found or missing URL',
    });
  });

  it('providerNews returns transformed data on success', async () => {
    const fakeItems = [{ title: 'x' }, { title: 'y' }];
    const controller = createRssController({
      parse: async (url: string) => {
        assert.equal(url, 'http://provider.com/rss');
        return { items: fakeItems } as any;
      },
      getProviderById: async () => ({ url: 'http://provider.com/rss' }) as any,
      transformData: (items, limit) => {
        assert.deepEqual(items, fakeItems as any);
        assert.equal(limit, 3);
        return [
          {
            title: 'transformed',
            link: '',
            created: '',
            enclosures: [],
            description: '',
          },
        ];
      },
    });
    const { state, res } = createResponse();

    await controller.providerNews(
      { params: { id: 'provider1' }, query: { limit: 3 } } as any,
      res as any,
    );

    assert.equal(state.statusCode, 200);
    assert.deepEqual(state.payload, {
      data: [
        {
          title: 'transformed',
          link: '',
          created: '',
          enclosures: [],
          description: '',
        },
      ],
      count: 2,
    });
  });
});
