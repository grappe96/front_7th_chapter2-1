import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

/**
 * 공통 페이지 레이아웃 컴포넌트
 *
 * @param {Object} options - 레이아웃 옵션
 * @param {string} options.content - 메인 콘텐츠 HTML 문자열
 * @param {Object} options.headerOptions - Header 컴포넌트 옵션
 * @param {string} options.containerClass - 컨테이너 클래스 (기본값: "min-h-screen bg-gray-50")
 * @returns {string} 페이지 레이아웃 HTML 문자열
 */
export function PageLayout({ content, headerOptions = {}, containerClass = "min-h-screen bg-gray-50" }) {
  return `
    <div class="${containerClass}">
      ${Header(headerOptions)}
      ${content}
      ${Footer()}
    </div>
  `;
}
