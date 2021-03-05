import db from '@/plugins/firebase'

export default {
  GET_PRODUCTS_FROM_API ({ commit }) {
    //
    db.ref('products').once('value', (snapshot) => {
      // поллучаю массив обїектов из бд (firebase)
      const objData = snapshot.val()
      // передаю массив в мутацию
      commit('SET_PRODUCTS_TO_STATE', objData)
      console.log('Database data:', objData)
      return objData
    })
  },
  ADD_TO_CART ({ commit }, product) {
    commit('SET_CART', product)
  },
  DELETE_FROM_CART ({ commit }, index) {
    commit('REMOVE', index)
  },
  GET_SEACH_VUEX ({ commit }, value) {
    commit('SET_VALUE', value)
  }
}
