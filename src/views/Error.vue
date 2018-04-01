<template>
  <div>
    {{ errorType }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ErrorView',

  computed: {
    ...mapGetters({
      currentRoute: 'wordpress/currentRoute'
    }),

    errorType() {
      return this.currentRoute.type
    }
  }
}
</script>
