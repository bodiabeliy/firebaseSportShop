<template>
 <div class="wrapper">
  <div class="cart_item col-sm-12">
   <img class="cart_item_image" :src=" require('../assets/images/' + cart_item_data.image)" alt="">
   <div class="cart_item_info">
    <p class="a">{{ cart_item_data.name }}</p>
    <p>{{ cart_item_data.price }}</p>
    <p>{{ cart_item_data.article }}</p>
   </div>
   <div class="cart_item_quantity">
     <span>
       <span>quantity:</span>
       <p></p>
      <span class="QuantityIncriment" @click="incrementItem">+</span>
      <p>{{cart_item_data.quantity }}</p>
      <span class="QuantityDecriment" @click="decrementItem">-</span>
     </span>
   </div>
   <button class="delete" @click="Delete">Delete products <i class="fa fa-trash" aria-hidden="true"></i>
   </button>
 </div>
 </div>
</template>

<script>
export default {
  props: {
    cart_item_data: {
      type: Object,
      return: { }
    }
  },
  methods: {
    Delete () {
      this.$emit('Delete')
    },
    decrementItem () {
      if (this.cart_item_data.quantity > 1) {
        this.cart_item_data.quantity--
      }
    },
    incrementItem () {
      this.cart_item_data.quantity++
    }
  },
  mounted () {
    this.$set(this.cart_item_data, 'quantity', 1)
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=MuseoModerno:wght@600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
   p
  {
    font-family: 'Kanit', sans-serif;
  }
 .cart_item {
   width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
 }
 .cart_item_image {
  box-shadow:0 0 8px 0 #808080;
  margin-left: 100px;
  max-width: 240px;
  padding:10px;
 }

.QuantityDecriment
{
  cursor: pointer;
}
.QuantityIncriment
{
  cursor: pointer;
}
.delete
{
  font-family: 'MuseoModerno', cursive;
  color: white;
  height: 55px;
  width: 170px;
  background: rgb(255, 0, 55);
  border-radius: 50px;
}
.delete:hover
{
  background: rgb(165, 9, 22);
}
 @media screen and (max-width: 740px) {
    .wrapper
 {
    width: 740px;
  }
}
</style>
