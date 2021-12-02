const express = require('express');
const router = express.Router();
const invoices = require("../controllers/orders");
// Import exec to run the Foxit HTML to PDF executable
const { exec } = require('child_process');
// Import nodemailer to send emails
const nodemailer = require('nodemailer');

router.get('/', function(req, res) {
    res.render('invoice-list', {
        invoices: invoices,
        // Accepts errors and successes as query string arguments
        success: req.query['success'],
        error: req.query['error'],
    });
});

router.get('/:id', function(req, res) {
    const invoice = invoices.find(invoice => invoice.id === req.params['id']);
    // If the invoice doesn't exist, redirect the user back to the list page
    if (!invoice) {
        res.redirect('/invoices');
    }
    // Make the date format pretty
    const date = new Date().toLocaleDateString("en", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
    });
    res.render('invoice-single', { invoice, date });
});

router.get('/:id/email', function(req, res) {
    // Coming soon.
});

module.exports = router;