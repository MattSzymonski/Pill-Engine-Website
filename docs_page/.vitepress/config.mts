import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { codeReferenceSidebarItems } from './reference-sidebar'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    base: '/',
    srcDir: 'pages',
    title: "Pill Docs",
    description: "Guide and API reference for Pill - a modern, free and blazingly fast game engine",
    head: [
      // Google Fonts
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      ['link', { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
      // Favicons
      ['link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' }],
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' }],
      ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
      ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
      // Social meta
      ['meta', { property: 'og:title', content: 'Pill Docs' }],
      ['meta', { property: 'og:description', content: 'Guide and API reference for Pill Engine' }],
      ['meta', { property: 'og:image', content: '/favicons/web-app-manifest-512x512.png' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
    ],

    markdown: {
      html: true
    },

    mermaid: {
      flowchart: {
        curve: 'step'
      }
    },

    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      siteTitle: 'pill docs',

      nav: [
        {
          text: 'Guide',
          link: '/guide/introduction',
          activeMatch: '^/guide/'
        },
        {
          text: 'Reference',
          link: '/reference/',
          activeMatch: '^/reference/'
        }
      ],

      outline: {
        level: [2, 3],
        label: 'On this page'
      },

      search: {
        provider: 'local'
      },

      sidebar: {
        '/guide/': [
          {
            text: 'Introduction',
            items: [
              {
                text: 'What is Pill?',
                link: '/guide/introduction'
              }
            ],
          },
          {
            text: 'Getting Started',
            items: [
              { text: 'Setup', link: '/guide/getting-started/setup' },
              { text: 'Pill Launcher', link: '/guide/getting-started/pill-launcher' },
              { text: 'ECS (Entity Component System)', link: '/guide/getting-started/ecs' },
              { text: 'Resources', link: '/guide/getting-started/resources' }
            ]
          },
          {
            text: 'Next Steps',
            items: [
              { text: 'Next Steps', link: '/guide/next-steps' }
            ]
          },
          {
            text: 'Help',
            items: [
              { text: 'Troubleshooting', link: '/guide/troubleshooting' }
            ]
          },
          {
            text: 'Advanced',
            items: [
              { text: 'Pill Launcher', link: '/guide/advanced/pill-launcher' },
            ]
          },
          {
            text: 'Engine Development',
            items: [
              {
                text: 'Contributing',
                link: '/guide/contributing/contributing',
                items: [
                  { text: 'Coding Standards', link: '/guide/contributing/coding-standards' },
                  { text: 'Code of Conduct', link: '/guide/contributing/code-of-conduct' },
                ]
              },
              { text: 'CI Pipeline', link: '/guide/advanced/ci-pipeline' }
            ]
          },
          {
            
            text: 'Other',
            items: [
              { text: 'Brand Identity', link: '/guide/other/brand-identity' },
            ]
          }
        ],
        '/reference/': codeReferenceSidebarItems
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/Pillware/Pill-Engine' }
      ]
    }
  })
)