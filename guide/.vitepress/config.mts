import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/guide/',
  srcDir: 'pages',
  title: "pill guide",
  description: "Guide for Pill - Modern, free and blazingly fast game engine",
  head: [
    // Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
    // Social meta & favicon
    ['link', { rel: 'icon', href: '/media/logo/logo-192.png' }],
    ['meta', { property: 'og:title', content: 'Pill - Guide' }],
    ['meta', { property: 'og:description', content: 'Guide for Pill - Modern, free and blazingly fast game engine' }],
    ['meta', { property: 'og:image', content: '/media/logo/logo-512.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],

  markdown: {
    html: true
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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MattSzymonski/Pill-Engine' }
    ]
  }
})
