import Controller from "./js/controller/Controller.js";

const table = document.querySelector(".m_table_orders");
const controller = new Controller(table);

const applyFilter = (e) => {
    e.preventDefault();
    controller.filter();
};

const clearFilters = (e) => {
    e.preventDefault();
    controller.clearInputs();
    controller.filter();
};

document.querySelector('.h_form').onsubmit = applyFilter;

document.getElementById('btn-search').onclick = applyFilter;
document.getElementById('btn-clear').onclick = clearFilters;
document.getElementById('btn-config').onclick = (e) => {
    e.preventDefault();

    controller.modalController.toggleModal(e);
    controller.openConfig();
};

document.getElementById('add').onclick = (e) => {
    controller.openEditor();
};

document.querySelectorAll('.h_form_filters_cont_label_ipt')
    .forEach(input => {
        input.oninput = applyFilter;
    });