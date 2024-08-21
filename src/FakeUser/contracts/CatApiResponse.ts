/**
 * @description This is a very simplistic type for a response from the (external) Cat API.
 * @see https://developers.thecatapi.com
 */
export type CatApiResponse = [
  {
    id: number;
    url: string;
    width: number;
    height: number;
  }
];
