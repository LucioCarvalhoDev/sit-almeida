import Controller from "./js/controller/Controller.js";

const table = document.querySelector(".m_table_orders");
const modalContainer = document.querySelector(".m_modal-area");

const controller = new Controller(table);

const testOrder1 = {
    name: 'Julia Vigoline',
    phone: '99875678',
    description: '2 AL',
    date: new Date().getTime() + '',
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

// controller.createOrder(testOrder2);

function applyFilter(e) {
    e.preventDefault();
    controller.filter();
}

function clearFilters(e) {
    e.preventDefault();
    controller.clearInputs();
    controller.filter();
}

function toggleModal(e) {
    e.preventDefault();

    if (modalContainer.classList.contains('--hidden')) {
        modalContainer.classList.remove('--hidden');
    } else if (e.target.id == "overlay") {
        modalContainer.classList.add('--hidden');
    }
}

document.querySelector('.h_form').onsubmit = applyFilter;
document.getElementById('btn-search').onclick = applyFilter;
document.getElementById('btn-clear').onclick = clearFilters;

document.getElementById('btn-config').onclick = toggleModal;
document.getElementById('btn-export').onclick = controller.exportData.bind(controller);
document.getElementById('btn-import').onclick = (e) => {
    e.preventDefault();

    const elem = document.createElement('input');
    elem.type = "file";
    elem.accept = ".yaml";

    elem.onchange = (event) => {
        event.target.files[0]
            .text()
            .then(text => controller.importData(text));
    };
    elem.click();
};
document.getElementById('btn-clear-data').onclick = (e) => {
    e.preventDefault();

    controller.clearData();
};

document.getElementById('overlay').onclick = toggleModal;