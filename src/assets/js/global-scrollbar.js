(function () {
  const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';

  function initOverlayScrollbar() {
    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);

    if (
      sidebarWrapper &&
      window.OverlayScrollbarsGlobal &&
      window.OverlayScrollbarsGlobal.OverlayScrollbars
    ) {
      window.OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: 'os-theme-light',
          autoHide: 'leave',
          clickScroll: true
        }
      });
    }
  }

  // Initial load
  document.addEventListener('DOMContentLoaded', initOverlayScrollbar);

  // For Angular route change (VERY IMPORTANT)
  window.addEventListener('load', () => {
    setTimeout(initOverlayScrollbar, 300);
  });
})();
