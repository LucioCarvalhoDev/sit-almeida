import Controller from "./js/controller/Controller.js";

const table = document.querySelector(".m_table_orders");
const modalContainer = document.querySelector(".m_modal-area");
const overlay = document.getElementById('overlay');

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

const toggleModal = (e) => {
    e.preventDefault();

    if (modalContainer.classList.contains('--hidden')) {
        modalContainer.classList.remove('--hidden');
    } else if (e.target.id == "overlay") {
        modalContainer.classList.add('--hidden');
    }
};

const openConfig = (e) => {
    e.preventDefault();

    modalContainer.innerHTML = `
    <div class="m_modal-area_overlay_modal">
    <h4 class="m_modal-area_overlay_modal_title">Configurações</h4>
    <div class="m_modal-area_overlay_modal_sec">
        <input type="button" value="Exportar" id="btn-export"
            class="m_modal-area_overlay_modal_sec_btn">
        <input type="button" id="btn-import" class="m_modal-area_overlay_modal_sec_btn" value="Importar"
            name="file">
    </div>
    <div class="m_modal-area_overlay_modal_sec">
        <input type="button" value="X" id="btn-clear-data" class="m_modal-area_overlay_modal_sec_btn">
    </div>
</div>`;


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
};

document.querySelector('.h_form').onsubmit = applyFilter;
document.getElementById('btn-search').onclick = applyFilter;
document.getElementById('btn-clear').onclick = clearFilters;

document.getElementById('overlay').onclick = toggleModal;

document.getElementById('btn-config').onclick = (e) => {
    e.preventDefault();

    controller.modalController.toggleModal();
    controller.setConfig();
};;

// config modal
