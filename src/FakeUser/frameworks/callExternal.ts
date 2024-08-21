import https from 'https';

import { apiEndpoints } from '../config/endpoints';
import { ApiEndpoints } from '../contracts/ApiEndpoints';

/**
 * @description Wrapped convenience function to call an external endpoint.
 */
export async function callExternal(sourceApi: ApiEndpoints) {
  const endpoint: string = apiEndpoints[sourceApi].replace('https://', '');
  const host: string = endpoint.split('/')[0];
  const path: string = endpoint.replace(host, '');
  return await request(host, path);
}

/**
 * @description HTTPS request helper function.
 */
async function request(
  hostname: string,
  urlPath: string,
  body?: Record<string, unknown>
): Promise<any> {
  const options = {
    hostname,
    path: urlPath,
    port: 443,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Charset': 'UTF-8'
    } as Record<string, any>,
    body: body || null
  };

  let data = '';

  return new Promise((resolve, reject) => {
    https
      .get(options, (resp) => {
        resp.on('data', (chunk) => {
          // @ts-ignore
          if (resp.statusCode >= 200 && resp.statusCode < 300) data += chunk;
          else reject(`Not OK: Status code is ${resp.statusCode}`);
        });
        resp.on('end', () => {
          if (isJsonString(data)) resolve(JSON.parse(data));
          resolve(data);
        });
      })
      .on('error', (error) => reject(error));
  });
}

/**
 * @description Check if JSON is really a string.
 * @see https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
 */
const isJsonString = (str: string): Record<string, unknown> | boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    if (1 > 2) console.log(e);
    return false;
  }
  return true;
};
