import { EventManager } from "./EventManager.js";
import {
  handleCartIconClick,
  handleProductCardClick,
  handleAddToCartClick,
  handleRelatedProductClick,
  handleGoToProductListClick,
} from "./eventHandlers.js";

/**
 * 전역 이벤트 매니저 인스턴스
 * 애플리케이션 전체에서 공통으로 사용되는 이벤트 리스너를 관리합니다.
 */
let globalEventManager = null;

/**
 * 전역 이벤트 리스너를 초기화합니다.
 * 애플리케이션 시작 시 한 번만 호출됩니다.
 */
export function initGlobalEvents() {
  if (globalEventManager) {
    return; // 이미 초기화됨
  }

  globalEventManager = new EventManager();

  // 장바구니 아이콘 클릭 (이벤트 위임)
  globalEventManager.delegate(document, "click", "#cart-icon-btn", handleCartIconClick, {}, "global");

  // 상품 카드 클릭 (이벤트 위임)
  // .product-info와 .product-image 모두 처리
  globalEventManager.delegate(document, "click", ".product-info, .product-image", handleProductCardClick, {}, "global");

  // 장바구니 담기 버튼 클릭 (이벤트 위임)
  globalEventManager.delegate(document, "click", ".add-to-cart-btn", handleAddToCartClick, {}, "global");

  // 관련 상품 클릭 (이벤트 위임)
  globalEventManager.delegate(document, "click", ".related-product-card", handleRelatedProductClick, {}, "global");

  // 상품 목록으로 돌아가기 버튼 클릭 (이벤트 위임)
  globalEventManager.delegate(document, "click", ".go-to-product-list", handleGoToProductListClick, {}, "global");
}

/**
 * 전역 이벤트 매니저를 반환합니다.
 * @returns {EventManager|null} 전역 이벤트 매니저
 */
export function getGlobalEventManager() {
  return globalEventManager;
}

/**
 * 전역 이벤트 리스너를 모두 제거합니다.
 * 일반적으로 사용하지 않지만, 필요시 호출할 수 있습니다.
 */
export function clearGlobalEvents() {
  if (globalEventManager) {
    globalEventManager.removeAll();
    globalEventManager = null;
  }
}
