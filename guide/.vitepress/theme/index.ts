// Run with: npm run docs:dev
// Docs framework: https://vitepress.dev/reference/site-config
// Docs theme: https://vitepress-openapi.vercel.app/guide/getting-started.html

import DefaultTheme from 'vitepress/theme'
import type { Theme, EnhanceAppContext } from 'vitepress'
import 'vitepress-openapi/dist/style.css'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // Scrolling progress indicator (shows how deep the user scrolled on the page)
    if (typeof window !== 'undefined') {
      try {
        const mountProgress = () => {
          if (document.getElementById('scroll-progress')) return;
          const bar = document.createElement('div');
          bar.id = 'scroll-progress';
          document.body.appendChild(bar);

          const update = () => {
            const doc = document.documentElement;
            const scrollTop = window.scrollY || doc.scrollTop || 0;
            const scrollHeight = doc.scrollHeight - doc.clientHeight;
            const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            bar.style.width = pct + '%';
          };

          // Throttle using requestAnimationFrame
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

          // Update after navigation to new page
          if ((ctx.router as any)?.afterEach) {
            (ctx.router as any).afterEach(() => setTimeout(onScroll, 40));
          }

          // Initial update
          setTimeout(onScroll, 0);
        };

        // Mount when DOM is ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          mountProgress();
        } else {
          window.addEventListener('DOMContentLoaded', mountProgress);
        }
      } catch (e) {
        // silence errors in case DOM APIs are unavailable
        // console.warn('scroll progress init failed', e)
      }
    }
  }
} satisfies Theme
