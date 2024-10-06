// script.js

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterCategory = document.getElementById('filter-category');
    let expenses = [];

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        const expenseCategory = document.getElementById('expense-category').value;
        const expenseDate = document.getElementById('expense-date').value;

        const expense = {
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
            date: expenseDate
        };

        expenses.push(expense);
        updateExpenseList();
        updateTotalAmount();
        expenseForm.reset();
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            updateExpenseList();
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener('change', updateExpenseList);

    function updateExpenseList() {
        expenseList.innerHTML = '';
        const filteredExpenses = expenses.filter(expense => 
            filterCategory.value === 'All' || expense.category === filterCategory.value
        );

        filteredExpenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});