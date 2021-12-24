const table = document.querySelector(".m_table_orders");
const testOrder1 = {
    name: 'Julia Vigoline',
    phone: '99875678',
    description: '2 AL',
    date: '1640355652982',
    price: '16',
    payment: 'AP 6',
    ok: false
};
const testOrder2 = {
    name: 'CARLOS',
    phone: '1938',
    description: '1 AL',
    date: '1638316800000',
    price: '8',
    payment: 'PG',
    ok: false
};

const controller = new Controller(table);


function applyFilter(e) {
    e.preventDefault();
    controller.filter();
}

function clearFilters(e) {
    e.preventDefault();
    controller.clearInputs();
    controller.filter();
}

document.querySelector('.h_form').onsubmit = applyFilter;
document.getElementById('btn-search').onclick = applyFilter;
document.getElementById('btn-clear').onclick = clearFilters;