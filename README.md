# GitHub Stars

작동 방법 :

```
  cd github-stars
  install : npm install
  build : npm run build
  start : npm start
```

1. 사용 기술

- Typescript
- Html5
- Css3
- Axios

2. 기능 명세

(1) 탭 기능

- 탭 형식의 화면을 구성, API / 로컬 탭으로 이루어짐
- 각 탭 헤더를 선택하면 해당 탭과 연관된 콘텐츠가 보여짐
- index를 이용해 기능 구현

(2) 검색 기능

- github의 api를 호출해 사용자를 검색하는 기능과 localStorage에서 검색하는 기능
- github api의 경우 query로 `q`값과 `per_page`, `page`를 입력
- `q` 값으로는 사용자의 `name`, `login`이 모두 포함되어 검색되기 때문에 `+in:login` 문자열을 통해 login id로만 검색
- `q` 값을 `params`로 따로 빼지 않고 `/search/users?q=\${q}+in:login`처럼 주소에 연결한 이유는 `+`가 `params`을 통해 입력 될 경우 인코딩이 되어 `%`등의 문자로 표현돼 제대로 호출되지 않기때문
- 로컬의 경우 검색어와 localStorage에 있는 사용자의 `login` 값을 기준으로 검색

(3) 즐겨찾기 기능

- 사용자 목록을 누를 때마다 별 모양 색이 채워지거나 비워짐
- localStorage에 즐겨찾기 된 사용자 목록이 실시간으로 반영됨
- 로컬 사용자 목록에 그대로 반영

3. 설계 내용

(1) state 관리

- state 파일 내의 store에서 상태 관리가 필요한 변수들을 관리
- export 후 각 파일에서 import해 `store.xxx`로 호출

(2) list 관리

- view나 결과 값에 따라 달라지는 list view는 list.js에서 string 형태로 관리
- list를 담는 wrap인 `id="api-list-view"`와 `id="local-list-view"`의 innerHTML로 삽입

(3) webpack

- mode dev와 prod로 분리후 webpack-merge로 common과 통합
- dev에서 devServer > hot과 devtool로 hot module loading 설정
- prod에서는 optimization으로 번들 파일들 분리
