<template>
  <div class="v-catalog ">
    <Notification :messages="messages"
    :timeOut="3000"
    ></Notification>
    <router-link :to="{name: 'Cart', params: {cart_data: CART}}">
      <div class="cartLink"><i class="fa fa-opencart" aria-hidden="true"></i> {{ CART.length }}</div>
    </router-link>
   <div class="header">
    <h1 @click="Search(SearchTitle)">Catalog</h1>
    <div class="filters">
      <Select :options="options"
      @select="SelectOption"
      :selection="selected">
    </Select>
    <input v-model="SearchTitle" class="placeholder-panel" style="border: none;" placeholder="Enter needed goods...">
    <button class="btn chose" @click="LiightNight">
      <i v-if="this.chose == 0" class="fa fa-sun-o" aria-hidden="true"> Light</i>
      <i v-if="this.chose == 1" class="fa fa-moon-o" aria-hidden="true"> Night</i>
    </button>
    <div class="range-slider">
      <p>Min: {{ minPrice }}
        <input class="range-slider-input" type="range" min="200" max="24000" step="5"
        v-model.number="minPrice"
        @change="rangeSlider">
      </p>
      <p>Max: {{ maxPrice }}
        <input class="range-slider-input" type="range" min="200" max="24000" step="5"
      v-model.number="maxPrice"
      @change="rangeSlider">
      </p>
    </div>
    </div>
   </div>
    <div class="v-catalog__list">
      <CatalogItem
      v-for="product in paginationCamp"
        :key="product.article"
        :product_data="product"
        @AddToCart="AddToCart"
      >
    </CatalogItem>
    </div>
    <div class="pagination">
      <div class="page" v-for="page in pages" :key="page"
      @click="pageClick(page)">{{ page }}</div>
    </div>
  </div>
</template>

<script>
import CatalogItem from './v-catalog-item'
import Select from './v-select'
import Notification from './notification/v-notifications'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CatalogItem,
    Select,
    Notification
  },
  data: () => ({
    SearchTitle: '',
    options: [
      { name: 'палатки', value: 'c' },
      { name: 'рюкзаки', value: 'b' },
      { name: 'кресла', value: 'ch' },
      { name: 'шлемы', value: 's' },
      { name: 'ножи и мультитулы', value: 'c' }

    ],
    selected: 'Filter by:',
    sort: [],
    minPrice: 200,
    maxPrice: 24000,
    messages: [
    ],
    campPages: 9,
    pageNumber: 1,
    chose: 0
  }),
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
      'SEARCH_VALUE'
    ]),
    filter () {
      if (this.sort.length) {
        return this.sort
      } else {
        return this.PRODUCTS
      }
    },
    pages () {
      return Math.ceil(this.sort.length / 9)
    },
    paginationCamp () {
      const from = (this.pageNumber - 1) * this.campPages
      const to = from + this.campPages
      return this.sort.slice(from, to)
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART',
      'GET_SEACH_VUEX'
    ]),
    Search (value) {
      this.GET_SEACH_VUEX(value)
    },
    AddToCart (data) {
      this.ADD_TO_CART(data)
        .then(() => {
          const timeStep = Date.now().toLocaleString()
          this.messages.push(
            { name: 'Product add to cart', id: timeStep }
          )
        })
    },
    SelectOption (category) {
      // this.sort = []
      // const value = this
      // this.PRODUCTS.map(function (item) {
      //  if (item.category === category.name) {
      //   value.sort.push(item)
      //  }
      // })
      // this.selected = category.name
      const val = this
      this.sort = [...this.PRODUCTS]
      this.sort = this.sort.filter(function (item) {
        return item.price >= val.minPrice && item.price <= val.maxPrice
      })
      if (category) {
        this.sort = this.sort.filter(function (item) {
          val.selected = category.name
          return item.category === category.name
        })
      }
    },
    rangeSlider () {
      if (this.minPrice > this.maxPrice) {
        const temp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = temp
      }
      this.SelectOption()
    },
    pageClick (page) {
      this.pageNumber = page
    },
    LiightNight () {
      this.chose = 1
      const list = document.querySelector('.v-catalog__list')
      list.classList.toggle('them')
      list.classList.toggle('them_dark')
      const header = document.querySelector('.header')
      header.classList.toggle('them')
      header.classList.toggle('them_dark')
      const rangeSlider = document.querySelector('.range-slider-input')
      rangeSlider.classList.toggle('them')
      rangeSlider.classList.toggle('rangeSlider_dark')
      const pagination = document.querySelector('.btn')
      pagination.classList.toggle('them')
      pagination.classList.toggle('pagination_dark')
    },
    SortVal (value) {
      this.sort = [...this.PRODUCTS]
      if (value) {
        this.sort = this.sort.filter((item) => {
          return item.name.includes(value)
        })
      } else {
        this.sort = this.PRODUCTS
      }
    }
  },
  watch: {
    SortVal (value) {
      this.sort = this.sort.filter(function (item) {
        return item.name.includes(value)
      })
    }
  },
  mounted () {
    this.GET_PRODUCTS_FROM_API()
      .then((responce) => {
        console.log('Data success reload!')
        this.SelectOption()
        this.SortVal(this.SEARCH_VALUE)
      })
  }
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
  h1
  {
    font-family: 'Kanit', sans-serif;
  }
.v-catalog{
  margin-left:9%;
}

.v-catalog__list
{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.cartLink
{
  position: absolute;
  top: 0px;
  right: 10px;
  padding: 16px;
  border: solid 3px rgb(18, 104, 29);
  border-radius: 10%;
  background: rgba(241, 241, 241, 0.925);

}
.cartLink:hover
{
background: rgba(81, 187, 95, 0.911) !important;
}
.back
{
  background-color:rgb(17, 95, 23);
  color: #000;
  font-size: 19px;
}
.back:hover
{
  color: #fff;
}
.range-slider
{
  width: 250px;
  margin: auto 16px;
  text-align: center;
}
.range-slider svg, .range-slider input[type=range]
{
  margin: 5px;
}

.filters
{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pagination
{
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
.page
{
  margin: 2px;
  padding: 8px;
  border: solid 1px #6e6868;
  border-radius: 50%;
  width: 42px;
  height: 42px;
}
.page:hover
{
background: rgb(104, 87, 87);
cursor: pointer;
color: white;
}
.pageSelected
{
  background: rgb(104, 87, 87);
  cursor: pointer;
  color: white;
}

.chose
{
  background-image: url('../assets/night.png');
 display: flex;
 justify-content: flex-end;
  background: #eae9f2;
  color: black;
}
.them_dark
{
  color: #f2f2f2;
  border: 1px solid #373540;
  background: #373540;
}

.dark-them
{
  background: #161131;
}
.pagination_dark:hover
{
  background: orange;
}
.placeholder-panel {
border: 2px solid#e3e3e3;
display: flex;
justify-content: flex-start;
border-radius: 3%;
height: 40px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
display: flex;
align-items: center;
color: #375A64;
}
@media screen and (max-width: 770px) {
    .filters
 {
    flex-wrap: wrap;
    margin-top: 20px;
    left: 0;
  }
  .placeholder-panel {
    display: none;
  }
}
</style>
