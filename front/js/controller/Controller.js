class Controller {
    constructor(table) {
        this.tableView = new TableView(table);
        this.orders = [];
    }

    createOrder(data) {
        this.orders.push(new Order(data));
    }

    updateView() {
        this.tableView.updateView(this.orders);
    }

    filter() {
        const filter = {
            name: document.getElementById('ipt-name').value,
            phone: document.getElementById('ipt-phone').value,
            description: document.getElementById('ipt-description').value,
            price: document.getElementById('ipt-price').value,
            date: document.getElementById('ipt-date').value
        };

        const filteredOrders = this.orders.filter(order => {
            for (let prop in filter) {
                if (!order[prop].includes(filter[prop].toUpperCase())) {
                    return false;
                } else {
                    break;
                }
            }
            return true;
        });

        this.tableView.updateView(filteredOrders);
    }
}