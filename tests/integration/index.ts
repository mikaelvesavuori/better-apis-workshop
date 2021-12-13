import fetch from 'cross-fetch';
import Ajv from 'ajv';

import assertions from './assertions.json';

const INTEGRATION_ENDPOINT = 'https://RANDOM.execute-api.REGION.amazonaws.com/shared/fakeUser'; // TODO: EDIT THIS TO YOUR ENDPOINT

async function runIntegrationTests() {
  Promise.all(
    assertions.map(async (assertion: any) => {
      return new Promise(async (resolve, reject) => {
        const { name, payload, expectation, schema } = assertion;
        const { headers } = payload;

        console.log('Running integration test:\n', name);

        const response = await fetchData(INTEGRATION_ENDPOINT, headers);
        if (!response) throw new Error('❌ No response!');

        /**
         * If there is an Ajv matching schema use that to check,
         * else use an exact comparison to check.
         */
        const isMatch = schema
          ? test(schema, expectation)
          : JSON.stringify(response) === JSON.stringify(expectation);
        if (isMatch) resolve(true);
        else reject(false);
      });
    })
  ).catch(() => {
    console.log('❌ Failed integration tests');
    process.exit(1);
  });

  console.log('✅ Passed integration tests');
}

/**
 * @description Wrapper for fetching data.
 */
async function fetchData(url: string, headers?: any): Promise<any> {
  return await fetch(url, { headers })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

/**
 * @description Run a test by validating a schema with Ajv.
 */
function test(schema: any, data: any): boolean {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) return true;
  else return false;
}

runIntegrationTests();
