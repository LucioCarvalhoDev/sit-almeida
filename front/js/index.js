const table = document.querySelector(".m_table_orders");
const modalContainer = document.querySelector(".m_modal-area");

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
document.getElementById('btn-config').onclick = (e) => {
    e.preventDefault();
};
document.getElementById('btn-config').onclick = toggleModal;
document.getElementById('overlay').onclick = toggleModal;
