/**
 * 공통 이벤트 핸들러
 *
 * 모든 페이지에서 공통으로 사용되는 이벤트 핸들러들을 정의합니다.
 * 이벤트 위임을 사용하여 동적으로 추가되는 요소에도 이벤트가 적용됩니다.
 */

/**
 * 라우터 인스턴스를 가져옵니다.
 * @returns {Router|null} 라우터 인스턴스
 */
function getRouter() {
  return window.router || null;
}

/**
 * 장바구니 모달 열기 핸들러
 * @param {MouseEvent} event
 */
export function handleCartIconClick(event) {
  event.preventDefault();
  // TODO: 장바구니 모달 열기 로직 구현
  console.log("장바구니 아이콘 클릭");
}

/**
 * 상품 카드 클릭 핸들러 (상품 상세 페이지로 이동)
 * @param {MouseEvent} event
 * @param {Element} element
 */
export function handleProductCardClick(event, element) {
  const productId = element.dataset.productId || element.closest("[data-product-id]")?.dataset.productId;
  if (!productId) return;

  const router = getRouter();
  if (router) {
    router.navigate(`/product/${productId}`);
  }
}

/**
 * 장바구니 담기 버튼 클릭 핸들러
 * @param {MouseEvent} event
 * @param {Element} element
 */
export function handleAddToCartClick(event, element) {
  event.preventDefault();
  event.stopPropagation(); // 상품 카드 클릭 이벤트 전파 방지

  const productId = element.dataset.productId;
  if (!productId) return;

  // TODO: 장바구니에 상품 추가 로직 구현
  console.log("장바구니에 추가:", productId);
}

/**
 * 관련 상품 클릭 핸들러
 * @param {MouseEvent} event
 * @param {Element} element
 */
export function handleRelatedProductClick(event, element) {
  const productId = element.dataset.productId;
  if (!productId) return;

  const router = getRouter();
  if (router) {
    router.navigate(`/product/${productId}`);
  }
}

/**
 * 상품 목록으로 돌아가기 핸들러
 * @param {MouseEvent} event
 */
export function handleGoToProductListClick(event) {
  event.preventDefault();

  const router = getRouter();
  if (router) {
    router.navigate("/");
  }
}
