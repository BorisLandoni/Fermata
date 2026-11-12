(function() {
  if (window.__fermataAdBlock) return;
  window.__fermataAdBlock = true;

  // Sponsored items in the feeds, search results and below the player
  const HIDE = [
    'ad-slot-renderer',
    'ytm-ad-slot-renderer',
    'ytm-promoted-sparkles-web-renderer',
    'ytm-promoted-sparkles-text-search-renderer',
    'ytm-promoted-video-renderer',
    'ytm-companion-ad-renderer',
    'ytm-display-ad-renderer',
    'ytm-in-feed-ad-layout-renderer',
    'ytm-banner-promo-renderer',
    'ytm-rich-item-renderer:has(ad-slot-renderer)',
    'ytm-item-section-renderer:has(ad-slot-renderer)',
    '.ytp-ad-overlay-container',
    '.ytp-ad-image-overlay'
  ];
  const SKIP = [
    '.ytp-ad-skip-button',
    '.ytp-ad-skip-button-modern',
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button-container button'
  ].join(',');

  function addStyle() {
    if (document.getElementById('fermata-adblock-style')) return;
    const root = document.head || document.documentElement;
    if (!root) return;
    const s = document.createElement('style');
    s.id = 'fermata-adblock-style';
    s.textContent = HIDE.join(',\n') + ' { display: none !important; }';
    root.appendChild(s);
  }

  let muted = null;

  function check() {
    addStyle();
    const p = document.querySelector('#movie_player') || document.querySelector('.html5-video-player');
    const v = p ? p.querySelector('video') : null;

    if (p && v && p.classList.contains('ad-showing')) {
      // Remember the user's mute state to restore it after the ad
      if (muted === null) muted = v.muted;
      v.muted = true;
      const b = p.querySelector(SKIP) || document.querySelector(SKIP);
      if (b) b.click();
      if (isFinite(v.duration) && (v.duration > 0) && (v.currentTime < v.duration - 0.2)) {
        v.currentTime = v.duration - 0.1;
      }
    } else if (muted !== null) {
      if (v) v.muted = muted;
      muted = null;
    }
  }

  setInterval(check, 300);
  check();
})();
