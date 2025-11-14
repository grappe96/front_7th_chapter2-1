/**
 * render 함수 사용 예제
 *
 * 이 파일은 render 함수를 사용하는 방법을 보여주는 예제입니다.
 */

import { render, getPageEventManager, clearPageEvents } from "./render.js";

// 예제 1: 기본 렌더링
const html = "<div>기본 페이지</div>";
render(html);

// 예제 2: onMount 콜백을 사용한 이벤트 리스너 등록
render(html, {
  onMount: (eventManager) => {
    // 검색 입력 이벤트
    eventManager.on(
      document.getElementById("search-input"),
      "input",
      (event) => {
        console.log("검색어:", event.target.value);
      },
      {},
      "search",
    );

    // 장바구니 버튼 클릭 이벤트
    eventManager.delegate(
      document,
      "click",
      ".add-to-cart-btn",
      (event, element) => {
        const productId = element.dataset.productId;
        console.log("장바구니에 추가:", productId);
      },
      {},
      "cart",
    );
  },
});

// 예제 3: 스크롤 위치 유지
render(html, {
  scrollToTop: false, // 스크롤 위치 유지
});

// 예제 4: 이벤트 리스너 정리 없이 렌더링
render(html, {
  clearEvents: false, // 이전 이벤트 유지
});

// 예제 5: 현재 페이지의 이벤트 매니저 가져오기
const currentEventManager = getPageEventManager();
if (currentEventManager) {
  console.log("현재 등록된 리스너 개수:", currentEventManager.getListenerCount());
}

// 예제 6: 수동으로 이벤트 리스너 정리
clearPageEvents();

export { render, getPageEventManager, clearPageEvents };
