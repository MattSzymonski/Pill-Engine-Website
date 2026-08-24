// Docs framework: https://vitepress.dev/reference/site-config

import DefaultTheme from 'vitepress/theme'
import type { Theme, EnhanceAppContext } from 'vitepress'
import { enlargeMermaidDiagrams } from './mermaid'
import { initHomeBackground } from './hero-dither'
import '../../../pill_style.css'
import './styles.css'

// Scroll progress bar showing how deep the user has scrolled on the page.
// Mounts once and returns an update callback used after route changes.
function mountScrollProgress(): { update: () => void } {
  if (document.getElementById('scroll-progress')) {
    // Hot reload can re-run enhanceApp; keep the existing bar.
    return { update: () => {} };
  }

  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);

  const update = () => {
    const documentElement = document.documentElement;
    const scrollTop = window.scrollY || documentElement.scrollTop || 0;
    const scrollHeight = documentElement.scrollHeight - documentElement.clientHeight;
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = percentage + '%';
  };

  // Throttle via requestAnimationFrame so the bar stays smooth.
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return { update };
}

// Floating "work in progress" warning banner, styled like the landing page
// navbar (dark glass) with a yellow warning accent. Mounted once and shown
// on every docs page.
function mountWorkInProgressBanner(): void {
  if (document.getElementById('work-in-progress-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'work-in-progress-banner';
  banner.className = 'work-in-progress-banner';
  banner.setAttribute('role', 'status');

  const label = document.createElement('span');
  label.className = 'work-in-progress-label';
  label.textContent =
    'Documentation is heavily work in progress! Don\'t use it just yet!';

  banner.appendChild(label);
  document.body.appendChild(banner);
}

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // Client-only setup: the SSR build has no window or document.
    if (typeof window === 'undefined') return;

    // Mount the landing-style animated background on the home page only.
    initHomeBackground();

    // Show the floating "work in progress" warning on every docs page.
    mountWorkInProgressBanner();

    const progress = mountScrollProgress();

    // Single route-change hook: reset scroll, refresh the progress bar,
    // and re-attach the lightbox to newly rendered diagrams.
    ctx.router.onAfterRouteChange = (to: string) => {
      if (!to.includes('#')) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
      window.setTimeout(progress.update, 40);
      window.setTimeout(enlargeMermaidDiagrams, 200);
    };

    // Initial page load.
    progress.update();
    enlargeMermaidDiagrams();
  }
} satisfies Theme