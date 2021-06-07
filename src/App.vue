<template>
  <div id="app">
    <header>
      <img src="./assets/logo.svg" alt="Logo Dev Finance">
    </header>

    <main class="container">
      <section id="balance">
        <h2 class="sr-only" >Balanço</h2>

        <div class="card">
          <h3>
						<span>Entradas</span>
						<img src="./assets/income.svg" alt="Imagem de entradas">
					</h3>
          <p>{{balance.income}}</p>
        </div>
				<div class="card">
					<h3>
						<span>Saídas</span>
						<img src="./assets/expense.svg" alt="Imagem de saídas">
					</h3>
					<p>{{balance.expense}}</p>
				</div>
				<div class="card total">
					<h3>
						<span>Total</span>
						<img src="./assets/total.svg" alt="Imagem de total">
					</h3>
					<p>{{balance.total}}</p>
				</div>

				
      </section>

      <section id="transaction">
        <h2 class="sr-only" >Transações</h2>

				<a href="#" @click="openModal" class="button new">+ Nova Transação</a>

        <table id="data-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
							<th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="description">{{transaction.description}}</td>
              <td v-if="transaction.amount < 0" class="expanse">{{formatCurrency(transaction.amount)}}</td>
              <td v-else class="income">{{transaction.amount}}</td>
              <td class="date">{{transaction.date}}</td>
							<td>
								<img @click="deleteTransaction(transaction.id)" src="./assets/minus.svg" alt="Remover transação">
							</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
		
		<Modal 
			v-show="isModalVisible"
		/>

    <footer>
      <p>dev.finance$</p>
    </footer>
  </div>
</template>

<script>
	import Modal from './components/Modal';
	import { mapState, mapActions } from 'vuex';

	export default{
		name: 'App',
		components: {
			Modal
		},
		computed: {
			...mapState({
				transactions: state => state.transactions,
				isModalVisible: state => state.isModalVisible,
				balance: state => state.balance
			}),
		},
		data() {
			return {
				
		}
		},
		methods: {
			...mapActions([
				'deleteTransaction',
				'openModal'
			])

		},
	}
</script>

<style>
	/* ====== GLOBAL =========  */
	:root {
		--dark-blue: #363F5F;
		--green: #49AA26;
	}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

	html {
		font-size: 93.75%; /* 15px */ 
	}

	body {
		background: #f0f2f5;
		font-family: 'Poppins', sans-serif;
	}

	.container {
		width: min(90vw, 800px);
		margin: auto;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0,0,0,0);
		white-space: nowrap;
		border-width: 0;
	}

	/* ======= LINKS & BUTTONS ========== */
	a {
		color: #49AA26;
		text-decoration: none;
	}

	a:hover {
		color: #3DD705
	}

	.button.new {
		display: inline-block;
		margin-bottom: .8rem;
	}

	/* ======= TITLES ========== */
	h2 {
		margin-top: 3.2rem;
		margin-bottom: 0.8rem;
		font-weight: 400;
		color: var(--dark-blue);
	}

	/* ======= HEADER ========== */
	header {
		background: #2D4A22;
		padding: 2rem 0 10rem;
		text-align: center;
	}

	#logo {
		color: #FFF;
		font-weight: 100;
	}	

	/* ======= BALANCE ========= */
	#transaction {
		display: block;
		overflow-x: auto;
	}

	#balance {
		margin-top: -8rem
	}

	#balance h2 {
		color: #FFF;
		margin-top: 0;
	}

	/* ======= CARDS ========== */
	.card {
		background: #FFF;
		padding: 1.5rem 2rem;
		border-radius: 0.25rem;

		margin-bottom: 2rem;

		color: var(--dark-blue);
	}

	.card h3 {
		font-weight: 400;
		font-size: 1rem;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card p {
		font-size: 2rem;
		line-height: 3rem;

		margin-top: 1rem;
	}

	.card.total {
		background: #49AA26;
		color : #FFF
	}

	/* ======= TABLE ========= */
		#data-table {
			width: 100%;
			border-spacing: 0 0.5rem;
			color: #969CB3;
		}

		table thead tr th:first-child,
		table tbody tr td:first-child {
			border-radius: 0.25rem 0 0 0.25rem;
		}

		table thead tr th:last-child, 
		table tbody tr td:last-child {
			border-radius: 0 0.25rem 0.25rem 0;
		}

		table th {
			background: #FFF;

			font-weight: 400;
			padding: 1rem 2rem;

			text-align: left;
		}

		table tbody tr {
			opacity: 0.7;
		}

		table tbody tr:hover {
			opacity: 1;
		}

		table tbody td {
			background: #FFF;
			padding: 1rem 2rem;
		}

		td.description {
			color: var(--dark-blue);
		}

		td.income {
			color: #12A454;
		}

		td.expanse {
			color: #E92929;
		}

	/* ======= FOOTER ========= */
	footer {
		text-align: center;
		padding: 4rem 0 2rem;
		color: var(--dark-blue);
		opacity: 0.6;
	}

	/* ======= RESPONSIVE ========== */
	@media (min-width: 800px){
		html {
			font-size: 87.5%; /* 14px */
		}

		#balance {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
		}
	}
</style>
