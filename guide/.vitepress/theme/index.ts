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
    // ── Combined route-change handler: scroll-to-top + re-attach enlarge ──
    const onRouteChange = (to: string) => {
      if (typeof window === 'undefined') return;
      if (!to.includes('#')) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
      setTimeout(enlargeMermaidDiagrams, 200);
    };
    ctx.router.onAfterRouteChange = onRouteChange;

    // ── Click-to-enlarge Mermaid diagrams ────────────────────────────
    function enlargeMermaidDiagrams() {
      if (typeof window === 'undefined') return;
      document.querySelectorAll('.mermaid').forEach((container) => {
        const htmlContainer = container as HTMLElement;
        if (htmlContainer.dataset.enlargeReady === 'true') return;
        htmlContainer.dataset.enlargeReady = 'true';
        htmlContainer.style.cursor = 'pointer';
        htmlContainer.title = 'Click to enlarge';

        htmlContainer.addEventListener('click', () => {
          const svg = htmlContainer.querySelector('svg');
          if (!svg) return;

          const overlay = document.createElement('div');
          overlay.id = 'mermaid-overlay';
          overlay.innerHTML = `
            <div class="mermaid-overlay-backdrop"></div>
            <div class="mermaid-overlay-content">
              ${svg.outerHTML}
            </div>
            <button class="mermaid-overlay-close" title="Close (Esc)">&times;</button>
          `;

          const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
            document.removeEventListener('keydown', onKeyDown);
          };

          const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeModal();
          };

          overlay.querySelector('.mermaid-overlay-backdrop')!.addEventListener('click', closeModal);
          overlay.querySelector('.mermaid-overlay-close')!.addEventListener('click', closeModal);
          document.addEventListener('keydown', onKeyDown);

          document.body.appendChild(overlay);
          requestAnimationFrame(() => overlay.classList.add('active'));
        });
      });
    }

    // Run on initial load
    enlargeMermaidDiagrams();

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
