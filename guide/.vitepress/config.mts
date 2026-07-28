import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    base: '/',
    srcDir: 'pages',
    title: "pill guide",
    description: "Guide for Pill - Modern, free and blazingly fast game engine",
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
      ['meta', { property: 'og:title', content: 'Pill - Guide' }],
      ['meta', { property: 'og:description', content: 'Guide for Pill - Modern, free and blazingly fast game engine' }],
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
      outline: {
        level: [2, 3],
        label: 'On this page'
      },

      search: {
        provider: 'local'
      },

      sidebar: [
        {
          text: 'Introduction',
          items: [
            {
              text: 'What is Pill?',
              link: '/introduction',
              items: [
                { text: 'Intro (test)', link: '/introduction_test' }
              ]
            }
          ],
        },
        {
          text: 'Getting Started',
          items: [
            { text: 'Setup', link: '/getting-started/setup' },
            { text: 'Pill Launcher', link: '/getting-started/pill-launcher' },
            { text: 'ECS (Entity Component System)', link: '/getting-started/ecs' },
            { text: 'Resources', link: '/getting-started/resources' }
          ]
        },
        {
          text: 'Next Steps',
          items: [
            { text: 'Next Steps', link: '/next-steps' }
          ]
        },
        {
          text: 'Help',
          items: [
            { text: 'Troubleshooting', link: '/troubleshooting' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Pill Launcher', link: '/advanced/pill-launcher' },
          ]
        },
        {
          text: 'Engine Development',
          items: [
            {
              text: 'Contributing',
              link: '/contributing/contributing',
              items: [
                { text: 'Coding Standards', link: '/contributing/coding-standards' },
                { text: 'Code of Conduct', link: '/contributing/code-of-conduct' },
              ]
            },
           
            { text: 'CI Pipeline', link: '/advanced/ci-pipeline' }
          ]
        }
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/MattSzymonski/Pill-Engine' }
      ]
    }
  })
)
