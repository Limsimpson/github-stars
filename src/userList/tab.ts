import { store } from "./state";
import { $ } from './utils';
import { TabControllerParam } from './types';

const TabController = (param:TabControllerParam) => {
  let header = param.header,
    contents = param.contents;

  // load 직후 첫 화면에서 보여질 탭
  header[0].classList.add("show");
  contents[0].classList.add("show");

  // 클릭한 index와 이전 index가 일치하면 return을,
  // 다르면 changeContent를 실행한다.
  let headerClick = (index: number) => {
    header[index].addEventListener("click", function () {
      if (store.clicked == index) {
        return;
      } else {
        changeContent(index);
      }

      // 탭 선택에 따른 검색창 placeholder 반영
      let searchInput = $<HTMLInputElement>("#search-form > input");
      if (store.clicked === 0) {
        searchInput.placeholder = "Api 검색어를 입력하세요.";
      } else {
        searchInput.placeholder = "로컬 검색어를 입력하세요.";
      }
    });
  };

  // 몇 번째 index를 클릭했는지 넣어주기 위함
  for (let i = 0; i < header.length; i++) {
    headerClick(i);
  }

  // header와 content의 index번 째를 숨기고,
  // index를 바꿔 바뀐 header와 contents의 index를 보여준다.
  let changeContent = (step:number) => {
    header[store.clicked].classList.remove("show");
    contents[store.clicked].classList.remove("show");
    store.clicked = (step < 0 ? step + header.length : step) % header.length;
    header[store.clicked].classList.add("show");
    contents[store.clicked].classList.add("show");
  };
};

let tapMenu = $<HTMLDivElement>("#tab-wrap");

// querySelectAll은 배열이기 때문에
// TabController내부의 header와 contents의 index로 탭을 조종한다.
TabController({
  header: tapMenu.querySelectorAll(".tab-header > li"),
  contents: tapMenu.querySelectorAll(".tab-content > li"),
});
