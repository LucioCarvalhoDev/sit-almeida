import { stringify, parse } from "yaml";
import Dao from "../dao/Dao.js";
import Filter from "../helper/Filter.js";
import Order from "../model/Order.js";
import TableView from "../view/TableView.js";
import ModalController from "./ModalController.js";



export default class Controller {
    constructor(table) {
        this.dao = new Dao();
        this.tableView = new TableView(table);
        this.modalController = new ModalController();

        this.orders = [];

        this.mode = "settings";

        this.inputs = {
            name: document.getElementById('ipt-name'),
            phone: document.getElementById('ipt-phone'),
            description: document.getElementById('ipt-description'),
            price: document.getElementById('ipt-price'),
            date: document.getElementById('ipt-date'),
        };

        this.init();
    }

    async init() {
        await this.getOrders();
        // console.log(this.orders[0]);
    }

    exportData() {
        this.dao.getOrders()
            .then(dataArr => {
                return dataArr.map(data => new Order(data));
            })
            .then(orderArr => {
                const now = new Date();
                const content = stringify(orderArr);

                const link = document.createElement('a');
                link.href = 'data:application/text,' + encodeURIComponent(content);
                link.taget = '_blank';
                link.download = `pedidos_${now.getDate()}-${now.getMonth() + 1}-${now.getUTCFullYear()}.yaml`;

                link.click();
            });
    }

    importData(text) {
        const orderArr = parse(text).map(data => new Order(data));
        this.dao.importOrders(orderArr)
            .then(() => {
                this.getOrders();
            });
    }

    clearData() {
        this.dao.clearData();
        this.getOrders();
    }

    createOrder(data) {
        const order = new Order(data);
        this.dao.createOrder(order);
        this.getOrders();
    }

    getOrders() {
        return new Promise((resolve, reject) => {
            this.orders = [];
            this.dao.getOrders()
                .then(dataArr => {
                    dataArr.forEach(data => {
                        this.orders.push(new Order(data));
                    });
                    this.updateView(this.orders);
                    resolve();
                });
        });
    }

    updateView(orders) {
        const ordersHtml = Array.from(this.tableView.updateView(orders));

        ordersHtml.forEach(orderElem => orderElem.onclick = (e) => {
            this.dao.get(orderElem.dataset.id)
                .then(order => this.openEditor(order, this.dao.updateOrder));
        });
    }

    filter() {
        const params = {};

        for (const input in this.inputs) {
            if (input == "phone") {
                params[input] = this.inputs[input].value.toUpperCase().replaceAll(/[\s-()]/g, '');
                continue;
            }
            params[input] = this.inputs[input].value;
        }

        const objFilter = new Filter(params);

        const res = this.orders.filter(order => {
            return objFilter.eval(order);
        });

        this.updateView(res);
    }

    clearInputs() {
        for (const input in this.inputs) {
            this.inputs[input].value = '';
        }
    }

    openConfig() {
        this.modalController.openConfig();

        document.getElementById('btn-export').onclick = this.exportData.bind(this);
        document.getElementById('btn-import').onclick = () => {

            const elem = document.createElement('input');
            elem.type = 'file';
            elem.accept = '.yaml';

            elem.onchange = (event) => {
                event.target.files[0]
                    .text()
                    .then(text => this.importData(text));
            };
            elem.click();
        };

        document.getElementById('btn-clear-data').onclick = (e) => {
            e.preventDefault();

            this.clearData();
        };
    }

    openEditor(oldOrder = new Order(Order.template()), action = () => { }, enableInputs = true) {
        const currentOrder = new Order(oldOrder);

        const editorPromise = this.modalController.openEditor(oldOrder);
        this.modalController.toggleModal();

        const disableSwitchers = (document.querySelectorAll('[data-fild]'));
        disableSwitchers.forEach(btn => {
            const ipt = btn.previousElementSibling;
            btn.onclick = () => {
                ipt.disabled = !ipt.disabled;
            };
        });

        if (enableInputs)
            disableSwitchers.forEach(btn => btn.click());


        editorPromise
            .then(data => {
                for (let property in data) {
                    if (property == 'ok') {
                        currentOrder[property] = data[property];
                        continue;
                    }
                    currentOrder[property] = data[property];
                }
                this.updateOrder(currentOrder);
            });
    }

    updateOrder(order) {
        this.dao.updateOrder(order.id, order)
            .then(() => {
                this.getOrders();
                this.updateView(this.orders);
            });
    }
}