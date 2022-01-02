export default class ModalController {
    constructor() {
        this._modalContainer = document.querySelector('.m_box');
        this._overlay = document.getElementById('overlay');

        this._configHTML = `
        <div class="m_md_bg_config">
            <h4 class="m_md_bg_config_title">Configurações</h4>
            <div class="m_md_bg_config_sec">
                <input type="button" value="Exportar" id="btn-export"
                    class="m_md_bg_config_sec_btn">
                <input type="button" id="btn-import" class="m_md_bg_config_sec_btn" value="Importar"
                    name="file">
            </div>
            <div class="m_md_bg_config_sec">
                <input type="button" value="X" id="btn-clear-data" class="m_md_bg_config_sec_btn">
            </div>
        </div>`;

        this._orderHTML = `
        <form class="m_md_bg_order">
            <h4 class="m_md_bg_order_title">order</h4>
            <div class="m_md_bg_order_sec">
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-name">Nome</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-name">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-tel">Tel</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-tel">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-des">des</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-des">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-price">R$</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-price">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-date">date</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="date" id="ipt-order-date">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-ok">OK</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="checkbox" id="ipt-order-ok">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
            </div>
            <div class="m_md_bg_order_sec">
                <input type="button" class="m_md_bg_order_sec_btn" value="Cancelar" />
                <input type="button" class="m_md_bg_order_sec_btn" value="Salvar" id="btn-editor-submit"/>
            </div>
        </form>`;


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

    openConfig() {
        this._overlay.innerHTML = this._configHTML;
    }

    openEditor(data) {
        console.log(data);
        this._overlay.innerHTML = this._orderHTML;
        const subBtn = document.getElementById('btn-editor-submit');

        const inputs = this._overlay.querySelectorAll('input:not([type="button"])');
        console.log(inputs);

    }
}