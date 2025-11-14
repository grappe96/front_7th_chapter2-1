import { EventManager } from "./EventManager.js";

/**
 * SPA 렌더링을 위한 페이지별 이벤트 매니저
 * 페이지 전환 시 페이지별 이벤트 리스너를 정리하기 위해 사용됩니다.
 * 공통 이벤트는 globalEvents.js에서 관리됩니다.
 */
let pageEventManager = null;

/**
 * SPA 페이지 렌더링 함수
 *
 * @param {string} html - 렌더링할 HTML 문자열
 * @param {Object} options - 렌더링 옵션
 * @param {Function} options.onMount - 렌더링 후 실행할 콜백 함수 (페이지별 이벤트 리스너 등록 등)
 * @param {boolean} options.scrollToTop - 페이지 상단으로 스크롤할지 여부 (기본값: true)
 * @param {boolean} options.clearEvents - 이전 페이지의 이벤트 리스너를 정리할지 여부 (기본값: true)
 */
export function render(html, options = {}) {
  const { onMount = null, scrollToTop = true, clearEvents = true } = options;

  // 이전 페이지의 페이지별 이벤트 리스너 정리 (공통 이벤트는 유지)
  if (clearEvents && pageEventManager) {
    pageEventManager.removeAll();
    pageEventManager = null;
  }

  // DOM 업데이트
  document.body.innerHTML = html;

  // 스크롤 위치 초기화
  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // 새로운 페이지의 이벤트 매니저 생성 (페이지별 이벤트용)
  if (onMount || clearEvents) {
    pageEventManager = new EventManager();
  }

  // onMount 콜백 실행 (페이지별 이벤트 리스너 등록 등)
  if (onMount && typeof onMount === "function") {
    onMount(pageEventManager);
  }
}

/**
 * 현재 페이지의 이벤트 매니저를 반환합니다.
 * @returns {EventManager|null} 현재 페이지의 이벤트 매니저
 */
export function getPageEventManager() {
  return pageEventManager;
}

/**
 * 현재 페이지의 이벤트 리스너를 모두 제거합니다.
 * 공통 이벤트는 제거되지 않습니다.
 */
export function clearPageEvents() {
  if (pageEventManager) {
    pageEventManager.removeAll();
    pageEventManager = null;
  }
}
