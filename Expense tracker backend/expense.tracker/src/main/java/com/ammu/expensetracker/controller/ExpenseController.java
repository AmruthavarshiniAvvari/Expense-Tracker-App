package com.ammu.expensetracker.controller;

import com.ammu.expensetracker.dto.ExpenseSummary;
import com.ammu.expensetracker.entity.Expense;
import com.ammu.expensetracker.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController

@RequestMapping("/expenses")

public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    /* ADD EXPENSE */

    @PostMapping
    public Expense addExpense(
            @RequestBody Expense expense
    ) {

        return expenseService.addExpense(expense);
    }

    /* GET USER EXPENSES */

    @GetMapping
    public List<Expense> getAllExpenses() {

        return expenseService.getAllExpenses();
    }

    /* ADMIN GET ALL EXPENSES */

    @GetMapping("/admin/expenses")
    public List<Expense> getAdminExpenses() {

        return expenseService.getAllExpenses();
    }

    /* DELETE EXPENSE */

    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id
    ) {

        expenseService.deleteExpense(id);
    }

    /* UPDATE EXPENSE */

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense
    ) {

        return expenseService.updateExpense(
                id,
                expense
        );
    }

    /* CATEGORY FILTER */

    @GetMapping("/category/{category}")
    public List<Expense> getByCategory(
            @PathVariable String category
    ) {

        return expenseService
                .getExpensesByCategory(category);
    }

    /* SUMMARY */

    @GetMapping("/summary")
    public ExpenseSummary getSummary() {

        return expenseService.getSummary();
    }
}