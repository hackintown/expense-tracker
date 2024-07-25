import React, { useEffect, useState } from "react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (expenseName && amount) {
      setExpenses([...expenses, { name: expenseName, amount }]);
      setExpenseName("");
      setAmount("");
    }
  };
  const deleteExpense = (idx) => {
    const newExpenses = expenses.filter((_, i) => i !== idx);
    setExpenses(newExpenses);
  };
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="max-w-xl mx-auto border shadow-sm rounded-sm p-5 my-5 border-gray-500">
      <h1 className="text-2xl text-center font-medium">Expense Tracker</h1>
      <div className="flex gap-x-2 items-center justify-center my-4">
        <input
          className="border border-gray-600 shadow-sm px-2 py-1 outline-none focus:border-blue-500 rounded-sm"
          type="text"
          placeholder="Expenses"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          className="border border-gray-600 shadow-sm px-2 py-1 outline-none focus:border-blue-500 rounded-sm"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-md border-none 
        whitespace-nowrap text-base px-2 py-1"
          onClick={addExpense}
        >
          Add Expenses
        </button>
      </div>
      <ul className="p-5">
        {expenses.map((expense, idx) => (
          <li key={idx} className="list-decimal mx-2 my-2">
            <span className="text-base mx-2">
              {expense.name}: {expense.amount}
            </span>
            <button
              onClick={() => deleteExpense(idx)}
              className="bg-red-500 text-white p-2 px-2 py-1 rounded-sm shadow-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
