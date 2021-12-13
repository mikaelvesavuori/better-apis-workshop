import { ApiEndpoints } from '../../contracts/ApiEndpoints';

import { callExternal } from '../../frameworks/callExternal';

export function getImage(sourceApi: ApiEndpoints) {
  return callExternal(sourceApi);
}
