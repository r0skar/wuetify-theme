<template>
  <error-view v-if="hasError" />
  <single-view v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorView from '@/views/Error'
import SingleView from '@/views/Single'

export default {
  name: 'DefaultView',

  components: {
    ErrorView,
    SingleView
  },

  computed: {
    ...mapGetters({
      currentRoute: 'wordpress/currentRoute'
    }),

    hasError() {
      return this.currentRoute.type.includes(40)
    }
  }
}
</script>
