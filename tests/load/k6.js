import http from 'k6/http';
import { sleep } from 'k6';

// Setup
const endpoint = 'https://RANDOM.execute-api.REGION.amazonaws.com/shared/fakeUser'; // TODO: EDIT THIS TO YOUR ENDPOINT
const randomUser = getRandomUser();
const randomVersion = getRandomVersion();

/**
 * @description Helper to get one of the users.
 */
export function getRandomUser() {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const users = [
    'erroruser@company.com',
    'legacyuser@company.com',
    'standarduser@company.com',
    'betauser@company.com',
    'qauser@company.com',
    'devuser@company.com',
    'devnewfeatureuser@company.com'
  ];

  return getRandomInt(0, users.length - 1);
}

/**
 * @description Helper to get a random version (or none)
 */
export function getRandomVersion() {
  const random = Math.round(Math.random() * 100);
  if (random <= 50) return 1;
  if (random > 50 && random <= 100) return 2;
}

/**
 * K6 configuration
 */

export const options = {
  vus: 10,
  duration: '5s'
};

const params = {
  headers: {
    Authorization: randomUser,
    'X-Client-Version': randomVersion
  }
};

export default function () {
  http.get(endpoint, params);
  sleep(1);
}
