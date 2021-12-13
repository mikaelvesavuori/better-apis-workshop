/**
 * @description This is a very simplistic type for a response from the (external) catAPI.
 * @see https://thatcopy.pw/catapi/rest/
 */
export type CatApiResponse = {
  id: number;
  url: string;
  webpurl: string;
  x: number;
  y: number;
};
