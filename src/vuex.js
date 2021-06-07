import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    transactions: [],
    isModalVisible: false,
    balance: {
      income: 0,
      expense: 0,
      total: 0
    }
  },
  actions: {
    addTransaction({commit}, payload){
      commit('ADD_TRANSACTION', payload)
    },
    deleteTransaction({commit}, payload){
      commit('DELETE_TRANSACTION', payload)
    },
    updateBalance({commit}){
      commit('UPDATE_BALANCE')
    },
    openModal({commit}){
      commit('OPEN_MODAL')
    },
    closeModal({commit}){
      commit('CLOSE_MODAL')
    }
  },
  mutations: {
    ADD_TRANSACTION(state, transaction){
      state.transactions.push(transaction)
    },
    DELETE_TRANSACTION(state, id){
      state.transactions = state.transactions.filter(transaction => transaction.id != id)
    },
    UPDATE_BALANCE(state){
      state.transactions.forEach(transaction => {
        state.balance.income += transaction.amount
        console.log(transaction.amount)
      })

    },
    OPEN_MODAL(state){
      state.isModalVisible = true
    },
    CLOSE_MODAL(state){
      state.isModalVisible = false
    }
  }
  
})

export { store };