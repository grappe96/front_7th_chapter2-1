/**
 * Router 사용 예제
 *
 * 이 파일은 Router를 사용하는 방법을 보여주는 예제입니다.
 * 실제 프로젝트에서는 main.js에서 사용하시면 됩니다.
 */

import { Router, RouterType } from "./index.js";

// 예제 1: 팩토리 메서드를 사용하여 HistoryRouter 생성
const router = Router.create(RouterType.HISTORY);

// 예제 2: 간편 메서드를 사용하여 HistoryRouter 생성
// const router = Router.createHistoryRouter();

// 라우트 등록
router.addRoute("/", ({ pathname }) => {
  console.log("홈 페이지:", pathname);
  // 홈 페이지 렌더링 로직
});

router.addRoute("/product/:id", ({ pathname, params }) => {
  console.log("상품 상세 페이지:", pathname);
  console.log("상품 ID:", params.id);
  // 상품 상세 페이지 렌더링 로직
});

// 404 페이지 핸들러
router.addRoute("*", ({ pathname }) => {
  console.log("404 페이지:", pathname);
  // 404 페이지 렌더링 로직
});

// 라우터 시작
router.start();

// 프로그래밍 방식으로 네비게이션
// router.navigate("/product/123");

// 뒤로 가기
// router.back();

// 앞으로 가기
// router.forward();

// 현재 경로 가져오기
// const currentPath = router.getCurrentPath();

// 쿼리 파라미터 가져오기
// const queryParams = router.getQueryParams();

export { router };
