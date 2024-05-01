// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	 typescript: {
    strict: false
  },
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/color-mode', '@vueuse/nuxt', '@nuxtjs/supabase', 'nuxt-headlessui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  supabase: {
    redirect: false,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
});
