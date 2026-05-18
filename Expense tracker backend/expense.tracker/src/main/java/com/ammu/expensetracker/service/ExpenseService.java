package com.ammu.expensetracker.service;

import com.ammu.expensetracker.entity.Expense;
import com.ammu.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ammu.expensetracker.dto.ExpenseSummary;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id).orElseThrow();

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setType(updatedExpense.getType());
        expense.setDate(updatedExpense.getDate());

        return expenseRepository.save(expense);
    }
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }
    public ExpenseSummary getSummary() {

        List<Expense> expenses = expenseRepository.findAll();

        double income = 0;
        double expense = 0;

        for (Expense e : expenses) {

            if (e.getType().equalsIgnoreCase("INCOME")) {
                income += e.getAmount();
            } else {
                expense += e.getAmount();
            }
        }

        double balance = income - expense;

        return new ExpenseSummary(income, expense, balance);
    }
}

