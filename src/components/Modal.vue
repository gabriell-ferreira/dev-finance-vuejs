<template>
  <div class="modal-overlay active">
    <div class="modal">
      <div id="form">
        <h2>Nova Transação</h2> 
        <form action="">
          <div class="input-group">
            <label class="sr-only" for="description">Descrição</label>
            <input 
              type="text"
              name="description" 
              id="description"
              placeholder="Descrição"
              v-model="transaction.description"              
            />
          </div>  
          <div class="input-group">
            <label class="sr-only" for="amount">Valor</label>
            <input 
              type="number" 
              name="amount"
              step="0.01"
              autocomplete="off"
              id="amount"
              placeholder="0,00"
              v-model="transaction.amount"          
            />
            <small class="help" >
              Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais
            </small>
          </div> 
          <div class="input-group">
            <label class="sr-only" for="date">Data</label>
            <input 
              type="date" 
              name="date" 
              id="date"
              v-model="transaction.date"
            />
          </div>
          <div class="input-group actions">
            <a href="#" @click="closeModal" class="button cancel">Cancelar</a>
            <button @click="[ADD_TRANSACTION(), closeModal(),UPDATE_BALANCE()]" type="button" >Salvar</button>
          </div>
        </form> 
      </div>    
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  //import { formatCurrency } from '../utils/formatCurrency'

  export default {
    name: 'Modal',
    data() {
      return {
        count: 0,
        transaction: {
          id: '',
          description: '',
          amount: '',
          date: ''
        }
      }
    },
    computed: {
      ...mapState({
        transactions: state => state.transactions,
        isModalVisible: state => state.isModalVisible,
        balance: state => state.balance
      })
    },
    methods: {
      close(){
        this.$emit('close');
      },
      ...mapActions([
        'addTransaction',
        'closeModal',
        'updateBalance'
      ]),
      ADD_TRANSACTION(){
        this.addTransaction({
          id: this.count++,
          description: this.transaction.description,
          amount: Number(this.transaction.amount),
          date: this.transaction.date
        })

        this.transaction = {
          id: '',
          description: '',
          amount: '',
          date: ''
        }
      },
      UPDATE_BALANCE(){
        this.updateBalance()
      }
    },
  }
</script>
<style scoped>
  button {
    width: 100%;
    height: 50px;

    border: none;

    color: #FFF;
    background: #49AA26;

    padding: 0;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  button:hover {
    background: #3DD705;
  }

  .button.cancel {
    color: #E92929;
    border: 2px #E92929 solid;
    border-radius: 0.25rem;

    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.6;
  }

  .button.cancel:hover {
    opacity: 1;
  }

  .modal-overlay {
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.7);

    position: fixed;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    /* opacity: 0;
    visibility: hidden; */
  }

  /* .modal-overlay.active {
    opacity: 1;
    visibility: visible;
  } */

  .modal {
    background: #F0F2F5;
    padding: 2.4rem;
  }

  #form {
    max-width: 500px;
  }

  #form h2 {
    margin-top: 0;
  }

  #form form input {
    border: none;
    border-radius: 0.2rem;

    padding: .8rem;
    width: 100%;
  }

  .input-group {
    margin-top: 0.8rem;
  }

  .input-group small {
    opacity: 0.4;
  }

  .input-group.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input-group.actions .button,
  .input-group.actions button{
     width: 48%;
  }


</style>