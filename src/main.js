import { ProductListPageLoaded } from "./pages/ProductListPage.js";
import { ProductDetailPageLoaded } from "./pages/ProductDetailPage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { Router, RouterType } from "./router/index.js";
import { render } from "./utils/render.js";
import { initGlobalEvents } from "./utils/globalEvents.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

async function main() {
  // 전역 이벤트 리스너 초기화 (한 번만 실행)
  initGlobalEvents();

  // 라우터 생성 (동적 import를 사용하므로 async/await 필요)
  const router = await Router.create(RouterType.HISTORY);

  // 라우터를 전역에서 접근 가능하도록 설정 (이벤트 핸들러에서 사용)
  window.router = router;

  // 홈 페이지 (상품 목록)
  router.addRoute("/", () => {
    const 상품목록_레이아웃_로딩완료 = ProductListPageLoaded();
    render(상품목록_레이아웃_로딩완료, {
      onMount: () => {
        // 페이지별 이벤트 리스너 등록
        // 예: 검색, 필터 등
        // eventManager.on(document, "input", handler, {}, "product-list");
      },
    });
  });

  // 상품 상세 페이지
  router.addRoute("/product/:id", () => {
    const 상세페이지_로딩완료 = ProductDetailPageLoaded();
    render(상세페이지_로딩완료, {
      onMount: () => {
        // 페이지별 이벤트 리스너 등록
        // 예: 수량 조절 등
        // eventManager.on(document, "click", handler, {}, "product-detail");
      },
    });
  });

  // 404 페이지
  router.addRoute("*", () => {
    const _404_ = NotFoundPage();
    render(_404_);
  });

  // 라우터 시작
  router.start();
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
