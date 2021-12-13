/**
 * @description This is a very simplistic type for a response from the (external) JSONPlaceholder API.
 * @see https://jsonplaceholder.typicode.com
 */
export type JsonPlaceholderResponse = [User];

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
