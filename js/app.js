// variables

const form = document.querySelector('#agregar-gasto');
const spentList = document.querySelector('#gastos ul');

// Events

eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', askBudget );

  form.addEventListener('submit', addSpent );
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

  printAlert( message, typeMessage ) {
    const divMessage = document.createElement('DIV');
    divMessage.classList.add('text-center', 'alert');

    
    if (typeMessage === 'error') {
      divMessage.classList.add('alert-danger');
    } else {
      divMessage.classList.add('alert-success');
    }
    
    divMessage.textContent = message;
    
    document.querySelector('.primario').insertBefore(divMessage, form);
    
    setTimeout(() => {
      divMessage.remove();
    }, 1000)

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

function addSpent(e) {
  
  e.preventDefault();

  // read data from form
  const spentName = document.querySelector('#gasto').value;
  const spentAmount = document.querySelector('#cantidad').value;

  if (spentName === '' || spentAmount === '') {
    ui.printAlert('You should enter both fields', 'error')
    return;
  } else if ( spentAmount <= 0 || isNaN(spentAmount) ) {
    ui.printAlert(' Amount must be a number and greater than zero ', 'error' )
    return;
  }

  console.log('adding spent')

}