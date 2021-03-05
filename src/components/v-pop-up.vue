<template>
 <div class="popup">
  <div  class="popup-header">
   <span>{{ PopupTitle }}</span>
   <span>
    <i @click="Close" class="material-icons">close</i>
  </span>
  </div>
   <div class="popup-content">
    <slot></slot>
   </div>
 </div>
</template>

<script>
export default {
  props: {
    Title: {
      type: String,
      default: 'Ok'
    },
    PopupTitle: {
      type: String
    }
  },
  methods: {
    Close () {
      const close = document.querySelector('.popup')
      close.style.display = 'none'
    }
  }
}
</script>

<style>
 .popup
{
 padding: 16px;
 position: fixed;
 top: 0px;
 background: white;
 z-index: 5;
}
.popup-header, .popup-footer
{
 align-items: center;
 display: flex;
 justify-content: space-between;
}
.popup-content
{
 align-items: center;
 display: flex;
 justify-content: center;
}
.sumbit
{
 padding: 10px;
 color: white;
 background: #26ea68;
}
.close-modal
{
 padding: 10px;
 color: white;
 background: #e73f0c;
}

</style>
