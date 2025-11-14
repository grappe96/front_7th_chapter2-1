/**
 * 이벤트 리스너를 등록하고 관리하는 유틸리티 클래스
 *
 * 이 클래스는 이벤트 리스너의 등록, 제거, 그룹 관리를 담당합니다.
 * 메모리 누수를 방지하기 위해 라이프사이클 관리 기능을 제공합니다.
 */
export class EventManager {
  constructor() {
    /**
     * 등록된 이벤트 리스너들을 저장하는 Map
     * key: 이벤트 타입, value: Set of listeners
     */
    this.listeners = new Map();

    /**
     * 이벤트 리스너 그룹을 관리하는 Map
     * key: 그룹 이름, value: Set of event keys
     */
    this.groups = new Map();
  }

  /**
   * 이벤트 리스너를 등록합니다.
   * @param {EventTarget} target - 이벤트 타겟 (window, document, element 등)
   * @param {string} eventType - 이벤트 타입 (예: 'click', 'popstate')
   * @param {Function} handler - 이벤트 핸들러 함수
   * @param {Object} options - 이벤트 옵션 (capture, once, passive 등)
   * @param {string} groupName - 그룹 이름 (선택사항, cleanup 시 사용)
   * @returns {Function} 제거 함수
   */
  on(target, eventType, handler, options = {}, groupName = null) {
    if (typeof handler !== "function") {
      throw new Error("핸들러는 함수여야 합니다.");
    }

    // 이벤트 리스너 등록
    target.addEventListener(eventType, handler, options);

    // 리스너 정보 저장
    const key = this.createKey(target, eventType, handler);
    this.listeners.set(key, {
      target,
      eventType,
      handler,
      options,
      groupName,
    });

    // 그룹에 추가
    if (groupName) {
      if (!this.groups.has(groupName)) {
        this.groups.set(groupName, new Set());
      }
      this.groups.get(groupName).add(key);
    }

    // 제거 함수 반환
    return () => this.off(target, eventType, handler);
  }

  /**
   * 이벤트 리스너를 제거합니다.
   * @param {EventTarget} target - 이벤트 타겟
   * @param {string} eventType - 이벤트 타입
   * @param {Function} handler - 이벤트 핸들러 함수
   */
  off(target, eventType, handler) {
    const key = this.createKey(target, eventType, handler);
    const listenerInfo = this.listeners.get(key);

    if (!listenerInfo) {
      return;
    }

    // 이벤트 리스너 제거
    listenerInfo.target.removeEventListener(listenerInfo.eventType, listenerInfo.handler, listenerInfo.options);

    // 그룹에서 제거
    if (listenerInfo.groupName) {
      const group = this.groups.get(listenerInfo.groupName);
      if (group) {
        group.delete(key);
        if (group.size === 0) {
          this.groups.delete(listenerInfo.groupName);
        }
      }
    }

    // 리스너 정보 삭제
    this.listeners.delete(key);
  }

  /**
   * 이벤트 위임을 사용하여 리스너를 등록합니다.
   * @param {EventTarget} target - 이벤트 타겟 (일반적으로 document)
   * @param {string} eventType - 이벤트 타입
   * @param {string} selector - 선택자 (예: 'a[data-link]')
   * @param {Function} handler - 이벤트 핸들러 함수
   * @param {Object} options - 이벤트 옵션
   * @param {string} groupName - 그룹 이름 (선택사항)
   * @returns {Function} 제거 함수
   */
  delegate(target, eventType, selector, handler, options = {}, groupName = null) {
    const delegatedHandler = (event) => {
      const element = event.target.closest(selector);
      if (element) {
        handler.call(element, event, element);
      }
    };

    return this.on(target, eventType, delegatedHandler, options, groupName);
  }

  /**
   * 특정 그룹의 모든 이벤트 리스너를 제거합니다.
   * @param {string} groupName - 그룹 이름
   */
  removeGroup(groupName) {
    const group = this.groups.get(groupName);
    if (!group) {
      return;
    }

    // 그룹의 모든 리스너 제거
    for (const key of group) {
      const listenerInfo = this.listeners.get(key);
      if (listenerInfo) {
        listenerInfo.target.removeEventListener(listenerInfo.eventType, listenerInfo.handler, listenerInfo.options);
        this.listeners.delete(key);
      }
    }

    // 그룹 삭제
    this.groups.delete(groupName);
  }

  /**
   * 모든 이벤트 리스너를 제거합니다.
   */
  removeAll() {
    // 모든 리스너 제거
    for (const listenerInfo of this.listeners.values()) {
      listenerInfo.target.removeEventListener(listenerInfo.eventType, listenerInfo.handler, listenerInfo.options);
    }

    // 모든 데이터 초기화
    this.listeners.clear();
    this.groups.clear();
  }

  /**
   * 이벤트 리스너의 고유 키를 생성합니다.
   * @param {EventTarget} target - 이벤트 타겟
   * @param {string} eventType - 이벤트 타입
   * @param {Function} handler - 이벤트 핸들러 함수
   * @returns {string} 고유 키
   */
  createKey(target, eventType, handler) {
    // 타겟의 고유 식별자 생성
    let targetId = "";
    if (target === window) {
      targetId = "window";
    } else if (target === document) {
      targetId = "document";
    } else if (target instanceof Element) {
      targetId = target.id || `element_${target.tagName}_${Math.random().toString(36).substr(2, 9)}`;
    } else {
      targetId = `target_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 핸들러의 고유 식별자 생성
    // 함수에 고유 ID를 부여 (없으면 생성)
    if (!handler._eventManagerId) {
      handler._eventManagerId = `handler_${Math.random().toString(36).substr(2, 9)}`;
    }
    const handlerId = handler._eventManagerId;

    return `${targetId}_${eventType}_${handlerId}`;
  }

  /**
   * 등록된 리스너의 개수를 반환합니다.
   * @returns {number} 리스너 개수
   */
  getListenerCount() {
    return this.listeners.size;
  }

  /**
   * 특정 그룹의 리스너 개수를 반환합니다.
   * @param {string} groupName - 그룹 이름
   * @returns {number} 그룹의 리스너 개수
   */
  getGroupListenerCount(groupName) {
    const group = this.groups.get(groupName);
    return group ? group.size : 0;
  }
}
