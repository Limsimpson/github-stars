import { store } from "./state";
import {
  emptySearchedUser,
  searchedUsersList,
  renderStarUsersList,
} from "./list";
import { $ } from './utils';
import { searchUsers } from "./api";
import { User } from './types';

const apiListView = $('#api-list-view');
const localListView = $('#local-list-view');
const searchFrom = $<HTMLFormElement>("#search-form");

// 사용자 검색
searchFrom.addEventListener("submit", (e:Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const searchText = formData.get('search-input') as string;

  // 1. api로 검색 시 결과
  if (store.clicked === 0) {
    if (searchText === "" || searchText === null || searchText === undefined) {
      alert("검색어를 입력하세요.");
      return;
    }
    searchUsers(searchText)
      .then((res) => {
        // 개별 사용자 object에 star 항목 추가
        const users = res.data.items.map((user: User) => {
          return {
            ...user,
            star: store.starUsers.some((starUser: User) => starUser.id === user.id),
          };
        });
        // 결과에 따른 목록 보여주기
        const totalCount = res.data.total_count;
        store.searchedUsers = users;
        if (totalCount === 0) {
          emptySearchedUser({
            view: apiListView,
            text: "검색 결과가 없습니다.",
          });
        } else {
          searchedUsersList({ view: apiListView, users: store.searchedUsers });
        }
      })
      .catch((err) => console.error(err));
  } else {
    // 2. 로컬 목록에서 검색 시 결과
    // 검색어를 입력하지 않고 검색 할 경우 전체 즐겨찾기 사용자 목록이 나옴
    store.searchStarText = searchText;
    if (searchText === "" || searchText === null || searchText === undefined) {
      renderStarUsersList();
      return;
    }
    searchStarUsers(searchText);
  }
});

// 로컬 목록에서 사용자 검색
const searchStarUsers = (login: string) => {
  // 검색어(login)과 loginId(user.login) 값을 소문자로 통일한 후 일치하는지 확인
  const searchedStarUsers = store.starUsers.filter(
    (starUser: User) => !!starUser.login.toLowerCase().match(`.*${login.toLowerCase()}.*`)
  );

  if (0 < searchedStarUsers.length) {
    searchedUsersList({ view: localListView, users: searchedStarUsers });
  } else {
    emptySearchedUser({
      view: localListView,
      text: "일치하는 사용자가 없습니다.",
    });
  }
};

export { searchStarUsers };
