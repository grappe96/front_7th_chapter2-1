/**
 * EventManager 사용 예제
 *
 * 이 파일은 EventManager를 사용하는 방법을 보여주는 예제입니다.
 */

import { EventManager } from "./EventManager.js";

// EventManager 인스턴스 생성
const eventManager = new EventManager();

// 예제 1: 기본 이벤트 리스너 등록
// const removeClickHandler = eventManager.on(
//   document,
//   "click",
//   (event) => {
//     console.log("클릭됨:", event.target);
//   },
//   {},
//   "example-group",
// );

// 예제 2: 이벤트 위임 사용
// const removeLinkHandler = eventManager.delegate(
//   document,
//   "click",
//   "a[data-link]",
//   (event, element) => {
//     console.log("링크 클릭됨:", element.href);
//     event.preventDefault();
//   },
//   {},
//   "example-group",
// );

// 예제 3: window 이벤트 등록
// const removeResizeHandler = eventManager.on(
//   window,
//   "resize",
//   () => {
//     console.log("윈도우 크기 변경됨");
//   },
//   {},
//   "window-events",
// );

// 예제 4: 개별 리스너 제거
// removeClickHandler(); // 클릭 핸들러만 제거

// 예제 5: 그룹 단위로 제거
// eventManager.removeGroup("example-group"); // example-group의 모든 리스너 제거

// 예제 6: 모든 리스너 제거
// eventManager.removeAll(); // 모든 리스너 제거

// 예제 7: 리스너 개수 확인
console.log("전체 리스너 개수:", eventManager.getListenerCount());
// console.log("example-group 리스너 개수:", eventManager.getGroupListenerCount("example-group"));

export { eventManager };
