export default class ModalController {
    constructor() {
        this._modalContainer = document.querySelector('.m_modal-area');
        this._overlay = document.getElementById('overlay');

        this._configHTML = `
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

        this.init();
    }

    init() {
        this._overlay.onclick = this.toggleModal.bind(this);
    }

    toggleModal(e) {
        if (this._modalContainer.classList.contains('--hidden')) {
            this._modalContainer.classList.remove('--hidden');
            document.querySelector('body').dataset.modal = "on";

        } else if (e.target.id == "overlay") {
            this._modalContainer.classList.add('--hidden');
            document.querySelector('body').dataset.modal = "off";
        }
    };

    setConfig() {
        this._overlay.innerHTML = this._configHTML;
    }
}