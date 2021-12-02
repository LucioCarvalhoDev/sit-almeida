const table = document.querySelector(".m_table_orders");
const testOrder1 = {
    name: 'Julia Vigoline',
    phone: '99875678',
    description: '2 AL',
    date: '1638480115543',
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
controller.createOrder(testOrder1);
controller.createOrder(testOrder2);
controller.updateView();

document.getElementById('btn-search').onclick = (e) => {
    e.preventDefault();
    controller.filter();
};