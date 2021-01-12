export interface TabControllerParam {
  header : NodeListOf<Element>,
  contents: NodeListOf<Element>
}

export interface User {
  login: string,
  id: number,
  avatar_url: string,
  star?: boolean,
  [x: string]: any,
}

export interface EmptySearchedUserParam {
  view: HTMLElement,
  text: string
}

export interface SearchedUsersListParam {
  view: HTMLElement,
  users: Array<User>
}