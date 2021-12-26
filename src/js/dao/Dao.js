import Dexie from "dexie";

export default class Dao {
    constructor() {
        this.db;
        this.init();
    }

    init() {
        this.db = new Dexie("Orders");

        this.db.version(1).stores({
            orders: `
                id,
                name,
                phone,
                description,
                date,
                price,
                payment,
                ok
            `
        });

        this.db.open()
            .catch(err => console.log(err));
    }

    createOrder(order) {
        return new Promise((resolve, reject) => {
            this.db.orders.bulkPut([order])
                .then(res => {
                    resolve(res);
                })
                .catch(err => console.log(err));
        });
    }

    importOrders(orders) {
        return new Promise((resolve, reject) => {
            this.db.orders.bulkPut(orders)
                .then(res => {
                    resolve(res);
                })
                .catch(err => console.log(err));
        });
    }

    clearData() {
        this.db.orders.clear();
    }

    getOrders() {
        return new Promise((resolve, reject) => {

            this.db.table("orders")
                .toArray()
                .then(orders => resolve(orders));
        });
    }
}