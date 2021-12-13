import { ApiEndpoints } from '../../contracts/ApiEndpoints';

import { callExternal } from '../../frameworks/callExternal';

export async function getData(sourceApi: ApiEndpoints) {
  return callExternal(sourceApi);
}
