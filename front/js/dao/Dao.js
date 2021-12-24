class Dao {
    constructor() {
        this.db;
        this.init();
    }

    init() {
        this.db = new Dexie("Orders");

        this.db.version(1).stores({
            orders: `
                date,
                name,
                phone,
                description,
                price,
                payment,
                ok
            `
        });

        this.db.open()
            .catch(err => console.log(err));
    }

    createOrder(order) {
        this.db.orders.bulkPut([order])
            .catch(err => console.log(err))
    }

    getOrders() {
        return new Promise((resolve, reject) => {

            this.db.table("orders")
                .toArray()
                .then(orders => resolve(orders))
        })
    }
}