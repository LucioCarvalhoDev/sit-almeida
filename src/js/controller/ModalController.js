import dateFormat from "dateformat";
import configHTML from './../../html/configModal.html';
import editorHTML from './../../html/editorModal.html';


export default class ModalController {
    constructor() {
        this._modalContainer = document.querySelector('.m_box');
        this._overlay = document.getElementById('overlay');

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
        this._overlay.innerHTML = configHTML;
    }

    openEditor(data) {
        return new Promise((resolve, reject) => {
            this._overlay.innerHTML = editorHTML;
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


                const newData = {};
                inputs.forEach(ipt => {
                    const propertyName = ipt.dataset.editorField;
                    switch (propertyName) {
                        case 'ok':
                            newData[propertyName] = ipt.checked;
                            break;
                        case 'date':
                            newData[propertyName] = ipt.value;
                            break;
                        default:
                            newData[propertyName] = ipt.value;
                    }
                });

                this._overlay.click();
                resolve(newData);

            });
        });

    }
}