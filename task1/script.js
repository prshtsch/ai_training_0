let expenses = [];

function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || !amount) {
        alert('Please fill in both category and amount');
        return;
    }

    expenses.push({ category, amount });
    updateTable();
    clearInputs();
}

function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}

function deleteAllExpenses() {
    if (expenses.length === 0) {
        alert('No expenses to delete');
        return;
    }

    if (confirm('Are you sure you want to delete all expenses?')) {
        expenses = [];
        updateTable();
        // Reset results
        document.getElementById('totalExpenses').textContent = '$0';
        document.getElementById('averageExpense').textContent = '$0';
        document.getElementById('topExpenses').innerHTML = '';
    }
}

function updateTable() {
    const tbody = document.getElementById('expenseBody');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = expense.category;
        row.insertCell(1).textContent = formatCurrency(expense.amount);

        const deleteCell = row.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteExpense(index);
        deleteCell.appendChild(deleteButton);
    });
}

function calculateExpenses() {
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';

    if (expenses.length === 0) {
        document.getElementById('totalExpenses').textContent = '$0';
        document.getElementById('averageExpense').textContent = '$0';
        const li = document.createElement('li');
        li.textContent = 'No expenses to display';
        li.style.color = '#999';
        topExpensesList.appendChild(li);
        return;
    }

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate average daily expense (assuming 30 days per month)
    const averageDaily = total / 30;

    // Get top 3 expenses
    const top3 = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Update results in the UI
    document.getElementById('totalExpenses').textContent = formatCurrency(total);
    document.getElementById('averageExpense').textContent = formatCurrency(averageDaily);

    top3.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: ${formatCurrency(expense.amount)}`;
        topExpensesList.appendChild(li);
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add sample data
const sampleData = [
    { category: 'Groceries', amount: 15000 },
    { category: 'Rent', amount: 40000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Entertainment', amount: 10000 },
    { category: 'Communication', amount: 2000 },
    { category: 'Gym', amount: 3000 }
];

// Initialize the table with sample data
sampleData.forEach(expense => {
    expenses.push(expense);
});
updateTable(); 