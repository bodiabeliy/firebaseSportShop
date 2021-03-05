<template>
 <div class="select">
   <p class="title" @click="Visible = !Visible">{{ selection }}</p>
  <div class="options" v-if="Visible">
   <p v-for="option in options"
   :key="option.value"
   @click="selectOption(option)">{{ option.name }}</p>
  </div>
 </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    selection: {
      type: String,
      default: 'Select by:'
    }
  },
  data: () => ({
    Visible: false
  }),
  methods: {
    selectOption (option) {
      this.$emit('select', option)
      this.Visible = false
    },
    HideSelect () {
      this.Visible = false
    }
  },
  mounted () {
    document.addEventListener('click', this.HideSelect.bind(this), true)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.HideSelect)
  }
}
</script>

<style>
.select
{
 position: relative;
 width: 150px;
}
.title
{
 cursor: pointer;
}
.options
{
 background: #fff;
 position: absolute;
 border: solid 1px rgb(155, 150, 150);
 margin: 0;
 width: 100%;
 z-index: 3;
}
.options p:hover
{
 background: #e7e7e7;
}
</style>
