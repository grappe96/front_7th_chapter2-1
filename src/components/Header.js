/**
 * 공통 Header 컴포넌트
 *
 * @param {Object} options - Header 옵션
 * @param {boolean} options.showBackButton - 뒤로가기 버튼 표시 여부 (기본값: false)
 * @param {string} options.title - 헤더 제목 (기본값: "쇼핑몰")
 * @param {number|null} options.cartCount - 장바구니 아이템 개수 (기본값: null, 표시 안 함)
 * @returns {string} Header HTML 문자열
 */
export function Header({ showBackButton = false, title = "쇼핑몰", cartCount = null } = {}) {
  const titleElement = showBackButton
    ? `<h1 class="text-lg font-bold text-gray-900">${title}</h1>`
    : `<h1 class="text-xl font-bold text-gray-900">
        <a href="/" data-link="">${title}</a>
      </h1>`;

  const backButton = showBackButton
    ? `<button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>`
    : "";

  const cartBadge =
    cartCount !== null && cartCount > 0
      ? `<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${cartCount}</span>`
      : "";

  const leftSection = showBackButton
    ? `<div class="flex items-center space-x-3">
        ${backButton}
        ${titleElement}
      </div>`
    : titleElement;

  return `
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          ${leftSection}
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              ${cartBadge}
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}
