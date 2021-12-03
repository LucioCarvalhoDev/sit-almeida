class Controller {
    constructor(table) {
        this.tableView = new TableView(table);
        this.orders = [];
    }

    createOrder(data) {
        this.orders.push(new Order(data));
    }

    updateView(orders) {
        this.tableView.updateView(orders);
    }

    filter() {
        const params = {
            name: document.getElementById('ipt-name').value,
            phone: document.getElementById('ipt-phone').value,
            description: document.getElementById('ipt-description').value,
            price: document.getElementById('ipt-price').value,
            date: document.getElementById('ipt-date').value,
        };

        const objFilter = new Filter(params);

        const res = this.orders.filter(order => {
            return objFilter.eval(order);
        });

        this.updateView(res);

    }
}