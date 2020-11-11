import { store } from "./state";
import { User } from './types';

let apiListView = document.getElementById("api-list-view") as HTMLElement;
let localListView = document.getElementById("local-list-view") as HTMLElement;

interface EmptySearchedUserParam {
  view: HTMLElement,
  text: string
}

// 사용자 목록이 비어있을 때 각 탭에 해당하는 view와 상황에 따른 text를 넣어준다.
const emptySearchedUser = (param: EmptySearchedUserParam) => {
  let emptyText = `
    <div class="empty-list">
      <p tabindex="0">${param.text}</p>
    </div>
  `;
  param.view.innerHTML = emptyText;
};

interface SearchedUsersListParam {
  view: HTMLElement,
  users: Array<User>
}
// 검색 된 사용자 목록
// .join("")을 해주는 이유는 문자열 안에서 .map으로 새로운 배열을 리턴하기 때문에 여러개일 경우 ","가 들어간다. 이를 없애주기 위함
// option으로는 각 탭에 해당하는 view와 users가 필요함
const searchedUsersList = (param: SearchedUsersListParam) => {
  let view = param.view,
    users = param.users;

  // 알파벳 순, 대문자 > 소문자 순으로 정렬
  users = users.sort((prevUser, nextUser) => {
    if (prevUser.login[0].toLowerCase() === nextUser.login[0].toLowerCase()) {
      if (prevUser.login < nextUser.login) {
        return -1;
      }
      if (prevUser.login > nextUser.login) {
        return 1;
      }
      return 0;
    } else {
      if (prevUser.login.toLowerCase() < nextUser.login.toLowerCase()) {
        return -1;
      }
      if (prevUser.login.toLowerCase() > nextUser.login.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  });

  // line 47 - 55 초성 보여주기
  let userList = `<ul id="api" class="content-wrap">
      ${users
        .map((user, idx) => {
          return `
          ${
            idx === 0 ||
            users[idx - 1].login.toLowerCase()[0] !==
              user.login.toLowerCase()[0]
              ? `<div class="start-letter" tabindex="0">${
                  user.login.toLowerCase()[0]
                }</div>`
              : ""
          }
            <li id="user-${user.id}">
              <button id="btn-star" type="button" onclick="onClickStar(${
                user.id
              })">
                <div class="profile-wrap">
                  <div class="image">
                    <img src="${user.avatar_url}" alt="프로필 사진" />
                  </div>
                  <p class="name">${user.login}</p>
                </div>
                <div class="star ${user.star === true && " fill"}">
                  <span>별 버튼</span>
                  <i></i>
                </div>
              </button>
            </li>
          `;
        })
        .join("")}
    </ul>`;

  view.innerHTML = userList;
};

// 즐겨찾기 사용자 목록 랜더 관련 함수
// 즐겨찾기 한 사용자가 0명보다 많을 경우 searchedUsersList를 0명일 경우 emptySearchedUser를 호출
const renderStarUsersList = () => {
  if (0 < store.starUsers.length) {
    searchedUsersList({ view: localListView, users: store.starUsers });
  } else {
    emptySearchedUser({
      view: localListView,
      text: "즐겨찾기 한 사용자가 없습니다.",
    });
  }
};

// load 직후 첫 화면에 보여질 목록 화면
emptySearchedUser({ view: apiListView, text: "사용자를 검색하세요." });
renderStarUsersList();

export { emptySearchedUser, searchedUsersList, renderStarUsersList };
