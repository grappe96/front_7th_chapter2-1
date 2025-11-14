import { Router } from "./Router.js";
import { EventManager } from "../utils/EventManager.js";

/**
 * History API를 사용하는 라우터 구현체
 */
export class HistoryRouter extends Router {
  constructor() {
    super();
    this.routes = new Map();
    this.currentHandler = null;
    this.eventManager = new EventManager();
    this.boundPopStateHandler = this.handlePopState.bind(this);
    this.boundClickHandler = this.handleClick.bind(this);
  }

  /**
   * 라우트를 등록합니다.
   * @param {string} path - 라우트 경로 (예: '/', '/product/:id')
   * @param {Function} handler - 라우트 핸들러 함수
   */
  addRoute(path, handler) {
    if (typeof handler !== "function") {
      throw new Error("핸들러는 함수여야 합니다.");
    }
    this.routes.set(path, handler);
  }

  /**
   * 경로와 등록된 라우트를 매칭합니다.
   * @param {string} pathname - 매칭할 경로
   * @returns {Object|null} { handler, params } 또는 null
   */
  matchRoute(pathname) {
    for (const [routePath, handler] of this.routes.entries()) {
      const params = this.matchPath(routePath, pathname);
      if (params !== null) {
        return { handler, params };
      }
    }
    return null;
  }

  /**
   * 라우트 패턴과 경로를 매칭합니다.
   * @param {string} pattern - 라우트 패턴 (예: '/product/:id')
   * @param {string} pathname - 실제 경로
   * @returns {Object|null} 매칭된 파라미터 객체 또는 null
   */
  matchPath(pattern, pathname) {
    const patternParts = pattern.split("/");
    const pathnameParts = pathname.split("/");

    if (patternParts.length !== pathnameParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathnamePart = pathnameParts[i];

      if (patternPart.startsWith(":")) {
        // 동적 파라미터
        const paramName = patternPart.slice(1);
        params[paramName] = pathnamePart;
      } else if (patternPart !== pathnamePart) {
        // 정확한 매칭 실패
        return null;
      }
    }

    return params;
  }

  /**
   * 현재 경로로 이동합니다.
   * @param {string} path - 이동할 경로
   * @param {Object} state - 상태 객체 (선택사항)
   */
  navigate(path, state = {}) {
    const url = new URL(path, window.location.origin);
    const pathname = url.pathname;
    const search = url.search;

    // History API를 사용하여 URL 변경
    window.history.pushState(state, "", pathname + search);

    // 라우트 핸들러 실행
    this.executeRoute(pathname, search);
  }

  /**
   * 라우트 핸들러를 실행합니다.
   * @param {string} pathname - 경로
   * @param {string} search - 쿼리 문자열
   */
  executeRoute(pathname, search = "") {
    const match = this.matchRoute(pathname);

    if (match) {
      const { handler, params } = match;
      const queryParams = new URLSearchParams(search);
      this.currentHandler = handler;
      handler({ pathname, params, queryParams, state: history.state });
    } else {
      // 404 처리
      const notFoundHandler = this.routes.get("*");
      if (notFoundHandler) {
        this.currentHandler = notFoundHandler;
        notFoundHandler({ pathname, params: {}, queryParams: new URLSearchParams(search) });
      }
    }
  }

  /**
   * popstate 이벤트 핸들러
   * @param {PopStateEvent} _event
   */
  // eslint-disable-next-line no-unused-vars
  handlePopState(_event) {
    const pathname = window.location.pathname;
    const search = window.location.search;
    this.executeRoute(pathname, search);
  }

  /**
   * 링크 클릭 이벤트 핸들러
   * @param {MouseEvent} event
   * @param {Element} element - 클릭된 링크 요소
   */
  handleClick(event, element) {
    const href = element.getAttribute("href");
    if (!href) return;

    // 외부 링크나 특수 프로토콜 체크
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    event.preventDefault();
    this.navigate(href);
  }

  /**
   * 뒤로 가기
   */
  back() {
    window.history.back();
  }

  /**
   * 앞으로 가기
   */
  forward() {
    window.history.forward();
  }

  /**
   * 라우터를 시작합니다.
   */
  start() {
    // popstate 이벤트 리스너 등록 (뒤로/앞으로 가기 처리)
    this.eventManager.on(window, "popstate", this.boundPopStateHandler, {}, "router");

    // 링크 클릭 이벤트 리스너 등록 (이벤트 위임 사용)
    this.eventManager.delegate(document, "click", "a[data-link]", this.boundClickHandler, {}, "router");

    // 초기 라우트 실행
    const pathname = window.location.pathname;
    const search = window.location.search;
    this.executeRoute(pathname, search);
  }

  /**
   * 라우터를 중지합니다.
   */
  stop() {
    // router 그룹의 모든 이벤트 리스너 제거
    this.eventManager.removeGroup("router");
    this.currentHandler = null;
  }

  /**
   * 현재 경로를 반환합니다.
   * @returns {string} 현재 경로
   */
  getCurrentPath() {
    return window.location.pathname + window.location.search;
  }

  /**
   * 현재 쿼리 파라미터를 반환합니다.
   * @returns {URLSearchParams} 쿼리 파라미터
   */
  getQueryParams() {
    return new URLSearchParams(window.location.search);
  }
}
