import axios, { AxiosResponse } from "axios";
import { User } from './types';

let apiUrl = "https://api.github.com";

// +in:login은 user의 loginId로만 검색할 수 있도록 함
// 한 페이지당 최대 100개, 1 페이지만 보일 수 있도록 고정
const searchUsers = (q:string):Promise<AxiosResponse<User>> => {
  return axios.get(`${apiUrl}/search/users?q=${q}+in:login`, {
    params: {
      per_page: 100,
      page: 1,
    },
  });
};

export { searchUsers };
