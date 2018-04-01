<template>
  <div id="app"
       class="flex flex-col h-screen"
       itemscope
       itemtype="http://schema.org/WebPage">
    <header role="banner"
            itemscope
            itemtype="http://schema.org/WPHeader">
      <app-header />
    </header>
    <main class="flex-1"
          role="main"
          itemscope
          itemtype="http://schema.org/WebPageElement"
          itemprop="mainContentOfPage">
      <router-view :key="$route.fullPath" />
    </main>
    <footer role="contentinfo"
            itemscope
            itemtype="http://schema.org/WPFooter">
      <app-footer />
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
@import '@/assets/css/main.css';
</style>
