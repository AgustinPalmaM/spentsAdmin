// variables
const form = document.querySelector('#agregar-gasto');
const spentList = document.querySelector('#gastos ul');

// Events
eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', askBudget )
}


// Classes

// Functions

function askBudget() {
  const budget = Number(prompt('What is your budget'));
  
  
  if( budget === '' || budget === null || isNaN(budget) || budget <= 0 ) {
    alert('You must enter a number and greater than zero')
    window.location.reload();
  } 

  
  

}

