// variables

const form = document.querySelector('#agregar-gasto');
const spentList = document.querySelector('#gastos ul');

// Events

eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', askBudget )
}


// Classes

class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.balance = Number(budget);
    this.spents = [];
  }
}

class UI {

  insertBudget(amounts) {
    // make const with elements from budget object
    const { budget, balance } = amounts;

    // insert html with budget and balance
    document.querySelector('#total').textContent = budget;
    document.querySelector('#restante').textContent = balance;

  }

}

// Instances

const ui = new UI();
let budget;


// Functions

function askBudget() {
  const askedBudget = prompt('What is your budget');
  
  
  if( askedBudget === '' || askedBudget === null || isNaN(askedBudget) || askedBudget <= 0 ) {
    alert('You must enter a number and greater than zero')
    window.location.reload();
  } 

  budget = new Budget(askedBudget);
  ui.insertBudget(budget)
}

