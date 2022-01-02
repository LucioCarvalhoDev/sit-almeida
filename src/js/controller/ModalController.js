import dateFormat from "dateformat";

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
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-name" 
                        data-editor-field="name">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-tel">Tel</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-tel" 
                        data-editor-field="phone">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-des">des</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-des" 
                        data-editor-field="description">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-price">R$</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="text" id="ipt-order-price" 
                        data-editor-field="price">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-date">date</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="date" id="ipt-order-date" 
                        data-editor-field="date">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
                <div class="m_md_bg_order_sec_fild">
                    <label class="m_md_bg_order_sec_field_label" for="ipt-order-ok">OK</label>
                    <input class="m_md_bg_order_sec_field_ipt" disabled type="checkbox" id="ipt-order-ok" 
                        data-editor-field="ok">
                    <span class="m_md_bg_order_sec_field_edit" data-fild="off"><i class="fas fa-pen"></i></span>
                </div>
            </div>
            <div class="m_md_bg_order_sec">
                <input type="button" class="m_md_bg_order_sec_btn" value="Cancelar" />
                <button class="m_md_bg_order_sec_btn" id="btn-editor-submit">Salvar</button>
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
        return new Promise((resolve, reject) => {
            this._overlay.innerHTML = this._orderHTML;
            const saveBtn = document.getElementById('btn-editor-submit');

            // preenche campos do editor com dados fornecidos
            const inputs = this._overlay.querySelectorAll('input:not([type="button"]):not([type="submit"])');
            inputs.forEach(ipt => {
                const propertyName = ipt.dataset.editorField;

                ipt.value = data[propertyName];
                if (propertyName == 'date') {
                    ipt.value = (dateFormat(data[propertyName] || new Date(), "yyyy-mm-dd"));
                } else if (propertyName == 'ok') {
                    ipt.checked = data[propertyName];
                }
            });

            saveBtn.addEventListener('mousedown', (e) => {
                e.preventDefault();

                this._overlay.click();

                const newData = {};
                inputs.forEach(ipt => {
                    const propertyName = ipt.dataset.editorField;

                    switch (ipt.propertyName) {
                        case 'ok':
                            newData[propertyName] = ipt.checked;
                        case 'date':
                            newData[propertyName] = ipt.value;
                        default:
                            newData[propertyName] = ipt.value;
                    }
                });

                resolve(newData);

            });
        });

    }
}