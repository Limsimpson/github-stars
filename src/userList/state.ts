import { User } from './types';

// store type
export interface IStore {
  clicked: number,
  searchedUsers: Array<User>,
  starUsers: Array<User>,
  searchStarText: string,
}

const store: IStore = {
  clicked: 0,
  searchedUsers: [],
  starUsers: JSON.parse(localStorage.getItem("starUsers") || "[]"),
  searchStarText: "",
};

export { store };
