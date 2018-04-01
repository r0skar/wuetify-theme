<template>
  <div>
    {{ currentPost }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SingleView',

  computed: {
    ...mapGetters({
      currentPost: 'wordpress/currentPost'
    })
  }
}
</script>
