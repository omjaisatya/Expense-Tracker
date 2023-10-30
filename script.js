

const expenseDescription = document.getElementById('expense-description');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const addExpenseBtn = document.getElementById('add-expense');
const expensesList = document.getElementById('expenses');
const categoryTotal = document.getElementById('category-total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let categoryTotals = {};

addExpenseBtn.addEventListener('click', addExpense);

function addExpense() {
  const description = expenseDescription.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const expenseItem = {
    description,
    amount,
    category,
  };

  expenses.push(expenseItem);
  updateLocalStorage();
  updateCategoryTotal();

  displayExpense(expenseItem);
  expenseDescription.value = '';
  expenseAmount.value = '';
}

function displayExpense(expenseItem) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${expenseItem.description}</span>
    <span>₹
${expenseItem.amount.toFixed(2)}</span>
    <span>${expenseItem.category}</span>
  `;
  expensesList.appendChild(li);
}

function updateCategoryTotal() {
  categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  categoryTotal.innerHTML = '';
  for (const category in categoryTotals) {
    categoryTotal.innerHTML += `<p>${category}: ₹
${categoryTotals[category].toFixed(2)}</p>`;
  }
}

function updateLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

expenses.forEach((expenseItem) => {
  displayExpense(expenseItem);
});
updateCategoryTotal();


const deleteAllExpensesBtn = document.getElementById('delete-all-expenses');
deleteAllExpensesBtn.addEventListener('click', deleteAllExpenses);

function deleteAllExpenses() {
  expenses = [];
  updateLocalStorage();
  expensesList.innerHTML = ''
  categoryTotals = {};
  categoryTotal.innerHTML = '';
}

// Display existing expenses and calculate category totals
expenses.forEach((expenseItem) => {
  displayExpense(expenseItem);
});
updateCategoryTotal();
