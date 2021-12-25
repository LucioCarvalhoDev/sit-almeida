class Controller {
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

    /*
    exportData() {
        const now = new Date();
 
        const link = document.createElement('a');
        link.href = 'data:application/json,' + encodeURIComponent(); // inserir aqui os dados
        link.taget = '_blank';
        link.download = `pedidos_${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()}.json`;
 
    } 
    */

    createOrder(data) {
        const order = new Order(data);
        this.orders.push(order);
        this.dao.createOrder(order);
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