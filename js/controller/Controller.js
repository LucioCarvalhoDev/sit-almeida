import { stringify, parse } from "./../../node_modules/yaml/browser/index.js";
import Dao from "../dao/Dao.js";
import Filter from "../model/Filter.js";
import Order from "../model/Order.js";
import TableView from "../view/TableView.js";



export default class Controller {
    constructor(table) {
        this.dao = new Dao();
        this.tableView = new TableView(table);
        this.orders = [];

        this.inputs = {
            name: document.getElementById('ipt-name'),
            phone: document.getElementById('ipt-phone'),
            description: document.getElementById('ipt-description'),
            price: document.getElementById('ipt-price'),
            date: document.getElementById('ipt-date'),
        };

        this.init();
    }

    init() {
        this.getOrders();
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
                link.href = 'data:application/text,' + encodeURIComponent(content); // inserir aqui os dados
                link.taget = '_blank';
                link.download = `pedidos_${now.getDate()}-${now.getMonth() + 1}-${now.getUTCFullYear()}.yaml`;

                link.click();
            });
    }

    importData(text) {
        const orderArr = parse(text).map(data => new Order(data));
        orderArr.forEach(order => this.createOrder(order));

    }


    createOrder(data) {
        const order = new Order(data);
        this.dao.createOrder(order);
        this.getOrders();
    }

    getOrders() {
        this.orders = [];
        this.dao.getOrders()
            .then(dataArr => {
                dataArr.forEach(data => {
                    this.orders.push(new Order(data));
                });
                this.updateView(this.orders);
            });
    }

    updateView(orders) {
        this.tableView.updateView(orders);
    }

    filter() {
        const params = {};

        for (const input in this.inputs) {
            params[input] = this.inputs[input].value.toUpperCase();
        }

        const objFilter = new Filter(params);

        console.log(objFilter);

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

    sort() {

    }
}