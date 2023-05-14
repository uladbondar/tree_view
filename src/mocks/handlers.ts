import { rest } from 'msw';

import tree from './tree.json';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/tree`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(tree));
  }),
];
