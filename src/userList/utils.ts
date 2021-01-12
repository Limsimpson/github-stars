import {User} from './types';

// html element를 선택하는 함수
export function $<T extends HTMLElement = HTMLLIElement>(selector: string): T {
  const element = document.querySelector(selector);
  return element as T;
}

// 알파벳 순, 대문자 > 소문자 순으로 정렬
export function sortUser (users: Array<User>): Array<User> {
  return users.sort((prevUser: User, nextUser: User) => {
    if (prevUser.login[0].toLowerCase() === nextUser.login[0].toLowerCase()) {
      if (prevUser.login < nextUser.login) return -1;
      if (prevUser.login > nextUser.login) return 1;
      return 0;
    } else {
      if (prevUser.login.toLowerCase() < nextUser.login.toLowerCase()) return -1;
      if (prevUser.login.toLowerCase() > nextUser.login.toLowerCase()) return 1;
      return 0;
    }
  });
}