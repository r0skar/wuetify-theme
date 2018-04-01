/* global PHP */
import createApp from '@/app'
import renderApp from 'vue-server-renderer/basic'

/**
 * Get a new instance for app, store and router.
 */
const { app, store, router } = createApp()

/**
 * The initial state of the application.
 *
 * We merge the base app state with the base wordpress state `PHP`.
 *
 * The `PHP` variable is created in the PHP-V8JS scope
 * in `wp-content/plugins/wue-plugin/App.php`. It is
 * only available in this file.
 */
const __INITIAL_STATE__ = {
  ...store.state,
  wordpress: {
    route: PHP.context.$route,
    forms: PHP.context.$forms,
    settings: PHP.context.$settings,
    menus: PHP.context.$menus,
    posts: PHP.context.$posts,
    user: PHP.context.$user
  }
}

/**
 * Sync the Vuex store module with the initial state.
 */
store.replaceState(__INITIAL_STATE__)

/**
 * The current wordpress URL is also our Vue router url.
 */
router.push(PHP.context.$route.path)

/**
 * Print the app for server side rendering.
 *
 * Include the initial state as a global variable
 * to be picked up by the client application.
 */
renderApp(app, (err, res) => {
  if (err) {
    return print(err)
  }

  print(`
  <html lang="${PHP.context.$template_tags.bloginfo_language}">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      ${PHP.context.$template_tags.wp_head}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="stylesheet" href="${PHP.client_css_url}">
      <link rel="stylesheet" href="${PHP.context.$template_tags.stylesheet_directory_url}/style.css">
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(__INITIAL_STATE__)}
      </script>
    </head>
    <body>
      <noscript class="block bg-red text-white text-center p-2">
        For full functionality of this site it is necessary to enable JavaScript.
        Here are the <a href="https://www.enable-javascript.com/" target="_blank">
        instructions how to enable JavaScript in your web browser</a>.
      </noscript>
      ${res}
      <script src="${PHP.client_js_url}"></script>
    </body>
  </html>
  `)
})
