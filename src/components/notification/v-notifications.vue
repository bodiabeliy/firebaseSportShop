<template>
<div class="notification">
  <transition-group name="animateList" class="messageList">
    <div class="content"
    v-for="message in messages"
    :key="message.id">
    <div class="content_text">
     <span>{{ message.name }}</span>
     <span class="material-icons">
      check_circle_outline
      </span>
    </div>
    <div class="content_button">
     <button v-if="leftButton.length">{{ leftButton }}</button>
     <button v-if="rightButton.length">{{ rightButton }}</button>
    </div>
   </div>
  </transition-group>
</div>
</template>
<script>
export default {
  props: {
    messages: {
      type: Array
    },
    leftButton: {
      type: String,
      default: ''
    },
    rightButton: {
      type: String,
      default: ''
    },
    timeOut: {
      type: Number,
      default: 3000
    }
  },
  methods: {
    Hiding () {
      const context = this
      if (this.messages.length) {
        setTimeout(function () {
          context.messages.splice(context.messages.length - 1, 1)
        }, context.timeOut)
      }
    }
  },
  watch: {
    messages () {
      this.Hiding()
    }
  },
  mouted () {
    this.Hiding()
  }
}
</script>

<style>
 .notification
 {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 6;
 }
 .content
 {
  padding: 10px;
  background: green;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 20px;
 }
 .content_text
 {
   display: flex;
   align-items: center;
 }
.material-icons
{
  padding-left: 15px;
}
.messageList
{
  display: flex;
  flex-direction: column-reverse;
}
.animateList-enter
{
  transform: translateX(120px);
  opacity: 0;
}
.animateList-enter-active
{
  transition: all .6s ease;
}
.animateList-enter-to
{
  opacity: 1;
}
.animateList-leave
{
  height: 50px;
  opacity: 1;
}
.animateList-leave-active
{
  height: 25px;
  transition: .6s ease;
  opacity: 0.5;
}
.animateList-leave-to
{
  height: 0;
  transform: translateX(120px);
}
.animateList-move
{
  transition: .6s ease;
}
</style>
