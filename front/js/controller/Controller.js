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
        const params = {
            name: document.getElementById('ipt-name').value,
            phone: document.getElementById('ipt-phone').value,
            description: document.getElementById('ipt-description').value,
            price: document.getElementById('ipt-price').value,
            date: document.getElementById('ipt-date').value,
        };

        const objFilter = new Filter(params);

        const res = this.orders.filter(order => {
            for (const prop in objFilter) {
                if (!order[prop].includes(objFilter[prop])) {
                    return false;
                }
            }
            return true;
        });

        console.log(res);
    }
}