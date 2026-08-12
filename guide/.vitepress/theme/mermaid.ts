// Click-to-enlarge Mermaid diagrams.
//
// Attaches a single listener to every `.mermaid` container and opens a
// fullscreen lightbox overlay on click. Containers are marked with a data
// attribute so re-running this function after route changes never attaches
// duplicate listeners.

/** Make every Mermaid diagram on the page clickable to open it fullscreen. */
export function enlargeMermaidDiagrams(): void {
  if (typeof document === 'undefined') return;

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

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') closeOverlay();
      };

      const closeOverlay = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
        document.removeEventListener('keydown', onKeyDown);
      };

      overlay.querySelector('.mermaid-overlay-backdrop')!.addEventListener('click', closeOverlay);
      overlay.querySelector('.mermaid-overlay-close')!.addEventListener('click', closeOverlay);
      document.addEventListener('keydown', onKeyDown);

      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('active'));
    });
  });
}
