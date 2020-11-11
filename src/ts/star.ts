import { store } from "./state";
import { renderStarUsersList } from "./list";
import { searchStarUsers } from "./search";
import { User } from './types';

const onClickStar = (userId: number) => {
  let user: User;
  let changedUser = document.getElementById(`user-${userId}`) as HTMLElement;
  let changedStar = changedUser.querySelector(".star") as HTMLElement;

  // api탭에서 즐겨찾기를 설정 / 해제 했는지 로컬에서 즐겨찾기 해제를 했는지 확인
  if (store.clicked === 0) {
    user = store.searchedUsers.find((searchedUser: User) => searchedUser.id === userId) as User;
  } else {
    user = store.starUsers.find((starUser: User) => starUser.id === userId) as User;
  }

  // 즐겨찾기를 누르면 star의 값이 true / false로 변하고 리스트에 내용을 반영
  // 별 모양에 class fill을 추가해 색을 칠하거나 뺌
  if (!user.star) {
    user.star = true;
    store.starUsers.push(user);
    changedStar.classList.add("fill");
  } else {
    user.star = false;
    store.starUsers = store.starUsers.filter((starUser: User) => starUser.id !== userId);
    changedStar.classList.remove("fill");
  }

  // 즐겨찾기를 누를 때매다 로컬에 저장된 값 수정, 즐겨찾기 목록 렌더
  // 즐겨찾기 목록에서 검색 후 즐겨찾기 값 수정 시 목록 렌더
  localStorage.setItem("starUsers", JSON.stringify(store.starUsers));
  if (store.searchStarText !== "" && store.clicked === 1) {
    searchStarUsers(store.searchStarText);
  } else {
    renderStarUsersList();
  }
};

declare global {
  interface Window { onClickStar: (userId: number) => void }
}
window.onClickStar = onClickStar;
