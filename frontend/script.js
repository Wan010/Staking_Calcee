const API = 'http://localhost:5000/api';


async function loadClients() {
const res = await fetch(`${API}/clients`);
const clients = await res.json();


const select = document.getElementById('clientSelect');
select.innerHTML = '';


clients.forEach(c => {
const opt = document.createElement('option');
opt.value = c._id;
opt.textContent = c.name;
select.appendChild(opt);
});
}


async function addClient() {
const name = document.getElementById('clientName').value;
const email = document.getElementById('clientEmail').value;


await fetch(`${API}/clients`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email })
});


loadClients();
}


async function addInvoice() {
const data = {
clientId: document.getElementById('clientSelect').value,
amount: document.getElementById('amount').value,
currency: document.getElementById('currency').value,
description: document.getElementById('desc').value,
date: new Date().toISOString().split('T')[0]
};


await fetch(`${API}/invoices`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});


loadInvoices();
}


async function loadInvoices() {
const res = await fetch(`${API}/invoices`);
const invoices = await res.json();


const box = document.getElementById('invoiceList');
box.innerHTML = '';


invoices.forEach(inv => {
const div = document.createElement('div');
div.innerHTML = `${inv.amount} ${inv.currency} - ${inv.description} - ${inv.date}`;
box.appendChild(div);
});
}


loadClients();
loadInvoices();
