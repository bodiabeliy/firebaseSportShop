export default {
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products
  },
  SET_CART: (state, product) => {
    let ProductExist = false
    state.cart.map(function (item) {
      if (item.article === product.article) {
        ProductExist = true
        item.quantity++
      }
    })
    ProductExist || state.cart.push({ ...product, quantity: 1 }) // данной строке мы сразу ставим quantity:1
  // для любого нового товара в корзине,
  // компоненты получают его сразу в пропсах
  },
  REMOVE: (state, index) => {
    state.cart.splice(index, 1)
  },
  SET_VALUE: (state, value) => {
    state.SearchTitle = value
  }
}
