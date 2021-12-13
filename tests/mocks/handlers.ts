import { rest } from 'msw';

import catApiResponse from './responses/catApi.json';
import randomUserResponse from './responses/randomUser.json';
import jsonPlaceholderResponse from './responses/jsonPlaceholder.json';
import mockachinoTogglesResponse from './responses/mockachinoTogglesResponse.json';

const CAT_API = 'https://thatcopy.pw/catapi/rest/';
const RANDOMUSER_API = 'https://randomuser.me/api/';
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/users';
const TOGGLES_ENDPOINT =
  process.env.TOGGLES_URL || 'https://www.mockachino.com/650dde1b-d1b5-48/toggles'; // TODO: EDIT THIS TO YOUR ENDPOINT

export const handlers = [
  rest.get(CAT_API, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catApiResponse));
  }),
  rest.get(RANDOMUSER_API, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(randomUserResponse));
  }),
  rest.get(JSONPLACEHOLDER_API, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(jsonPlaceholderResponse));
  }),
  rest.get(TOGGLES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockachinoTogglesResponse));
  })
];
