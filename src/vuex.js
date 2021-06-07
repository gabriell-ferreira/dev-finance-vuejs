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
      function income(){
        state.balance.income = state.transactions.reduce((income, transaction) => (income + transaction.amount), 0)
      }

      function expense(){
        state.balance.expense = state.transactions.reduce((expense, transaction) => (expense + transaction.amount), 0)
      }

      function total(){
        state.balance.total = state.balance.income + state.balance.expense
      }

      state.transactions.forEach(transaction => {
        if(transaction.amount > 0){
          income()
          total()
        } else if(transaction.amount < 0){
          expense()
        }
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