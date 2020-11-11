// user type
export type User = {
  login: string,
  id: number,
  avatar_url: string,
  star?: boolean,
  [x: string]: any,
}