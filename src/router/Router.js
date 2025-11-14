/**
 * Router 타입 상수
 */
export const RouterType = {
  HISTORY: "history",
  // 향후 HashRouter 등을 추가할 수 있습니다.
  // HASH: "hash",
};

/**
 * Router 추상 클래스
 * 모든 라우터 구현체가 따라야 하는 인터페이스를 정의합니다.
 */
export class Router {
  constructor() {
    if (this.constructor === Router) {
      throw new Error("Router는 추상 클래스이므로 직접 인스턴스화할 수 없습니다.");
    }
  }

  /**
   * 라우트를 등록합니다.
   * @param {string} _path - 라우트 경로
   * @param {Function} _handler - 라우트 핸들러 함수
   */
  // eslint-disable-next-line no-unused-vars
  addRoute(_path, _handler) {
    throw new Error("addRoute 메서드는 구현되어야 합니다.");
  }

  /**
   * 현재 경로로 이동합니다.
   * @param {string} _path - 이동할 경로
   * @param {Object} _state - 상태 객체 (선택사항)
   */
  // eslint-disable-next-line no-unused-vars
  navigate(_path, _state = {}) {
    throw new Error("navigate 메서드는 구현되어야 합니다.");
  }

  /**
   * 뒤로 가기
   */
  back() {
    throw new Error("back 메서드는 구현되어야 합니다.");
  }

  /**
   * 앞으로 가기
   */
  forward() {
    throw new Error("forward 메서드는 구현되어야 합니다.");
  }

  /**
   * 라우터를 시작합니다.
   */
  start() {
    throw new Error("start 메서드는 구현되어야 합니다.");
  }

  /**
   * 라우터를 중지합니다.
   */
  stop() {
    throw new Error("stop 메서드는 구현되어야 합니다.");
  }

  /**
   * 현재 경로를 반환합니다.
   * @returns {string} 현재 경로
   */
  getCurrentPath() {
    throw new Error("getCurrentPath 메서드는 구현되어야 합니다.");
  }

  /**
   * 현재 쿼리 파라미터를 반환합니다.
   * @returns {URLSearchParams} 쿼리 파라미터
   */
  getQueryParams() {
    throw new Error("getQueryParams 메서드는 구현되어야 합니다.");
  }

  /**
   * 라우터 타입에 따라 적절한 라우터 인스턴스를 생성합니다.
   * 팩토리 메서드 패턴을 사용합니다.
   * @param {string} type - 라우터 타입 (RouterType.HISTORY 등)
   * @param {Object} options - 라우터 옵션 (선택사항)
   * @returns {Promise<Router>} 라우터 인스턴스를 반환하는 Promise
   */
  static async create(type = RouterType.HISTORY, options = {}) {
    switch (type) {
      case RouterType.HISTORY: {
        // 순환 참조를 방지하기 위해 동적으로 import
        const { HistoryRouter } = await import("./HistoryRouter.js");
        return new HistoryRouter(options);
      }
      // 향후 다른 라우터 타입 추가 가능
      // case RouterType.HASH: {
      //   const { HashRouter } = await import("./HashRouter.js");
      //   return new HashRouter(options);
      // }
      default:
        throw new Error(`지원하지 않는 라우터 타입입니다: ${type}`);
    }
  }

  /**
   * 기본 HistoryRouter 인스턴스를 생성합니다.
   * @param {Object} options - 라우터 옵션 (선택사항)
   * @returns {Promise<HistoryRouter>} HistoryRouter 인스턴스를 반환하는 Promise
   */
  static async createHistoryRouter(options = {}) {
    return this.create(RouterType.HISTORY, options);
  }
}
