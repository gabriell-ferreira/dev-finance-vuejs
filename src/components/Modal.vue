<template>
  <div class="modal-overlay active">
    <div class="modal">
      <div id="form">
        <h2>Nova Transação</h2> 
        <form action="">
          <div class="input-group">
            <label class="sr-only" for="description">Descrição</label>
            <input
              :class="validateInput"
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
              :class="validateInput"
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
              :class="validateInput"
              type="date" 
              name="date" 
              id="date"
              v-model="transaction.date"
            />
          </div>
          <div class="input-group actions">
            <a href="#" @click="close" class="button cancel">Cancelar</a>
            <button @click='addTransaction' type="button" >Salvar</button>
          </div>
        </form> 
      </div>    
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Modal',
    data() {
      return {
        transaction: {
          description: '',
          amount: '',
          date: ''
        },
        validateInput: 'ok'
      }
    },
    methods: {
      close(){
        this.$emit('close')

        this.transaction.description = ''
        this.transaction.amount = ''
        this.transaction.date = ''
      },
      addTransaction(){
        for(let prop in this.transaction){
          if(this.transaction[prop] == ''){
            alert('Preencha todos os campos')

            return false
          }
        }

        this.validateInput = 'ok'
        this.$emit('addTransaction', this.transaction)
        this.close()
      }
    }
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

  #description.ok, #date.ok, #amount.ok {
    border: none 
  }

  #description.error, #date.error, #amount.error {
    border: 1px solid red 
  }

</style>