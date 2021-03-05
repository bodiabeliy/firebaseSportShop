<template>
  <div class="wrapper">
    <div @click="showInfo" v-if="!product_data.available == 0" class="v-catalog-item">
      <Popup v-if="isInfoPopup"
      @Closing="closePopup" @Add="AddToCart" Title="Add to Cart" :PopupTitle="product_data.name">
        <div class="info">
          <img :src=" require('../assets/images/' + product_data.image)" alt="img">
          <p class="v-catalog-item_name">{{ product_data.name}}</p>
          <p class="v-catalog-item_price">{{ product_data.price + " UAH."}}</p><br>
          <p>{{ "Количество на складе: " + product_data.available + "шт." }}</p>
          <p>{{"Цвет " + product_data.color}}</p>
        </div>
      </Popup>

      <img :src=" require('../assets/images/' + product_data.image)" alt="img">
      <p class="v-catalog-item_name">{{ product_data.name}}</p>
      <p class="v-catalog-item_price">{{ product_data.price + " UAH."}}</p>
      <button class="showInfo btn">Show info</button>
      <button  class="v-catalog-item_add_to_cart btn"
        @click="AddToCart">Add to cart <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </button>
    </div>
    <div v-if="product_data.available == 0" class="v-catalog-item_error">
      <img :src=" require('../assets/images/' + product_data.image)" alt="img">
      <p class="v-catalog-item_name">{{ product_data.name}}</p>
      <p class="v-catalog-item_price">{{ product_data.price + " UAH."}}</p>
      <p>Not available!</p>
    </div>
  </div>
</template>

<script>
import Popup from './v-pop-up'
export default {
  components: {
    Popup
  },
  props: {
    product_data: {
      type: Object,
      return: { }
    }
  },
  data: () => ({
    isInfoPopup: false
  }),
  methods: {
    AddToCart () {
      this.$emit('AddToCart', this.product_data)
      this.product_data.available--
    },
    showInfo () {
      this.isInfoPopup = true
    },
    closePopup () {
      this.isInfoPopup = false
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');
.v-catalog-item{
  flex-basis: 25%;
  box-shadow:0 0 8px 0 #9e9d9d;
  padding: 16px;
  margin-bottom: 16px;
}

.v-catalog-item:hover{
  background: rgba(71, 70, 70, 0.144);
}

.showInfo {
  padding: 8px, 16px;
  background-color: rgb(207, 15, 41);
  color: #fff;
  border-radius:7px;
}
.v-catalog-item_add_to_cart {
  background-color: rgb(26, 143, 32);
}
.btn
{
  padding: 8px, 16px;
  color: #fff;
  border-radius:7px;
}
.btn:hover
{
  background-color: rgb(39, 97, 38);
}
.v-catalog-item_price{
  font-family: 'Fugaz One', cursive;
}
.v-catalog-item_name{
  font-family: 'Russo One', sans-serif;
}
.v-catalog-item_error
{
  filter: grayscale(1) opacity(0.7);
}
 @media screen and (max-width: 740px) {
    .wrapper
 {
    width: 740px;
  }
}
</style>
