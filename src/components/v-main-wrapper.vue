<template>
  <div class="v-main-wrapper col-12 col-sm-12">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'CART'
    ])
  }
}
</script>

<!-- scoped - use styles for one component-->
<style scoped>

  .v-main-wrapper
  {
    padding-left: 30px;
    padding-left: 30px;
    width: 1500px;
  }

</style>
