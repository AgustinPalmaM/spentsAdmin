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

  newSpent(spent) {
    this.spents = [...this.spents, spent];
    this.calculateBalance();
  }

  calculateBalance() {
    const spentAmountSum = this.spents.reduce( ( total, spent ) => total + spent.spentAmount, 0 );
    this.balance = this.budget - spentAmountSum;
    
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
  
  addSpentsToHtml(spents) {
    this.cleanHtml();
    
    spents.forEach(spent => {
      const { spentName, spentAmount, id } = spent;
      // Create an LI tag to display the spent
      const newSpent = document.createElement('LI');
      newSpent.className = 'list-group-item d-flex justify-content-between align-items-center';
      newSpent.dataset.id = id;
      
      // add items spentName, spentAmount to the html inside newSpent li
      const div = document.createElement('DIV');
      const divTwo = document.createElement('DIV');
      divTwo.textContent = `${spentName}:`;
      div.className = 'd-flex justify-content-between align-items-center w-100 m-1';
      
      const spanDetailSpent = document.createElement('SPAN');
      spanDetailSpent.classList = 'badge badge-primary badge-pill';
      spanDetailSpent.textContent = `${spentAmount}`;
      div.appendChild(divTwo)
      div.appendChild(spanDetailSpent)
      
      const deleteButton = document.createElement('BUTTON');
      deleteButton.classList.add('btn', 'btn-danger', 'borrar-gasto');
      deleteButton.textContent = 'borrar';
      
      newSpent.appendChild(div);
      newSpent.appendChild(deleteButton);
      spentList.appendChild(newSpent);
    })
  }

  updateBalance(balance) {
  
    document.querySelector('#restante').textContent = balance;
    console.log(balance)
  }

  cleanHtml() {
    while(spentList.firstElementChild) {
      spentList.firstElementChild.remove();
    }
  }
  
}

// Instances

const ui = new UI();

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
  const spentAmount = Number(document.querySelector('#cantidad').value);
  
  if (spentName === '' || spentAmount === '') {
    ui.printAlert('You should enter both fields', 'error')
    return;
  } else if ( spentAmount <= 0 || isNaN(spentAmount) ) {
    ui.printAlert(' Amount must be a number and greater than zero ', 'error' )
    return;
  }
  
  const spent = { spentName , spentAmount, id: Date.now() };
  
  budget.newSpent(spent);

  ui.printAlert('Ok, spent added');

  const { spents, balance } = budget;
  ui.addSpentsToHtml( spents );

  ui.updateBalance( balance );

  form.reset();
  
}
