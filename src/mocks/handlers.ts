import { rest } from 'msw';

import tree from './tree.json';

export const handlers = [
  rest.get('/api/tree', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(tree));
  }),
];
