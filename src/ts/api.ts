import axios from "axios";

let apiUrl = "https://api.github.com";

// 사용자 검색 api 호출
// +in:login은 user의 loginId로만 검색할 수 있도록 함
// 한 페이지당 최대 100개, 1 페이지만 보일 수 있도록 고정
const searchUsers = (q:string) => {
  return axios.get(`${apiUrl}/search/users?q=${q}+in:login`, {
    params: {
      per_page: 100,
      page: 1,
    },
  });
};

export { searchUsers };
