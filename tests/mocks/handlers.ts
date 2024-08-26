import { http, HttpResponse } from 'msw';

import catApiResponse from './responses/CatAPI.json';
import randomUserResponse from './responses/randomUser.json';
import jsonPlaceholderResponse from './responses/jsonPlaceholder.json';
import mockachinoTogglesResponse from './responses/mockachinoTogglesResponse.json';

const CAT_API = 'https://thatcopy.pw/CatAPI/rest/';
const RANDOMUSER_API = 'https://randomuser.me/api/';
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/users';
const TOGGLES_ENDPOINT =
  process.env.TOGGLES_URL || 'https://www.mockachino.com/650dde1b-d1b5-48/toggles'; // TODO: EDIT THIS TO YOUR ENDPOINT

// TODO: Verify
export const handlers = [
  http.get(CAT_API, () => {
    return HttpResponse.json(catApiResponse, { status: 200 });
  }),
  http.get(RANDOMUSER_API, () => {
    return HttpResponse.json(randomUserResponse, { status: 200 });
  }),
  http.get(JSONPLACEHOLDER_API, () => {
    return HttpResponse.json(jsonPlaceholderResponse, { status: 200 });
  }),
  http.get(TOGGLES_ENDPOINT, () => {
    return HttpResponse.json(mockachinoTogglesResponse, { status: 200 });
  })
];
