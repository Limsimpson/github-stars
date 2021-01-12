import { store } from "./state";
import { EmptySearchedUserParam,SearchedUsersListParam } from './types';
import { $, sortUser} from './utils';
import {onClickStar} from './star';

const apiListView = $('#api-list-view');
const localListView = $('#local-list-view');

// 사용자 목록이 비어있을 때 각 탭에 해당하는 view와 상황에 따른 text를 넣어준다.
// param.view = apiListView | localListView
const emptySearchedUser = (param: EmptySearchedUserParam) => {
  const Div = document.createElement('div');
  Div.setAttribute('class', 'empty-list');
  const P = document.createElement('p');
  P.setAttribute('tabindex', '0');
  P.textContent = param.text;
  
  param.view.innerHTML = '';
  param.view.appendChild(Div);
  Div.appendChild(P);
};

// 검색 된 사용자 목록
// param.view = apiListView | localListView
const searchedUsersList = (param: SearchedUsersListParam) => {
  let view = param.view,
    users = param.users;

  users = sortUser(users);

  const Ul = document.createElement('ul');
  Ul.setAttribute('id', 'api');
  Ul.setAttribute('class', 'content-wrap');
  view.innerHTML = '';
  view.appendChild(Ul);

  users.map((user, idx) => {
    const Li = document.createElement('li');
    Li.setAttribute('id', `user-${user.id}`);
    const Btn = document.createElement('button');
    Btn.setAttribute('id', 'btn-star');
    Btn.setAttribute('type', 'button');
    Btn.onclick = function(e: MouseEvent){ onClickStar(user.id) };

    const profileWrapDiv = document.createElement('div');
    profileWrapDiv.setAttribute('class', 'profile-wrap');
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('class', 'image');
    const Img = document.createElement('img');
    Img.setAttribute('src', `${user.avatar_url}`);
    Img.setAttribute('alt', '프로필 사진');
    const nameP = document.createElement('p');
    nameP.setAttribute('class', 'name');
    nameP.textContent = user.login;

    const starDiv = document.createElement('div');
    starDiv.setAttribute('class', `star ${user.star === true && 'fill'}`);
    const Span = document.createElement('span');
    const I = document.createElement('i');

    // 초성 보여주기
    if(idx === 0 || users[idx - 1].login.toLowerCase()[0] !== user.login.toLowerCase()[0]) {
      const initialDiv = document.createElement('div');
      initialDiv.setAttribute('class', 'start-letter');
      initialDiv.setAttribute('tabindex', '0');
      initialDiv.textContent = user.login.toLowerCase()[0];
      Ul.appendChild(initialDiv);
    }

    Ul.appendChild(Li);
    Li.appendChild(Btn);
    Btn.appendChild(profileWrapDiv);
    Btn.appendChild(starDiv);
    profileWrapDiv.appendChild(imageDiv);
    imageDiv.appendChild(Img);
    profileWrapDiv.appendChild(nameP);
    starDiv.appendChild(Span);
    starDiv.appendChild(I);
  })
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
