export default class Filter {
    constructor({ name, phone, description, price, date }) {
        phone ? this.phone = phone.toUpperCase() : '';
        name ? this.name = name.toUpperCase() : '';
        description ? this.description = description.toUpperCase() : '';
        price ? this.price = price.toUpperCase() : '';
        date ? this.date = date.toUpperCase() : '';
    }

    eval(order) {
        for (const prop in this) {
            if (prop == 'date') {
                return new Date(order.getFormatedDateUS()) >= new Date(this[prop]);
            }
            if (!order[prop].includes(this[prop])) {
                return false;
            }
        }
        return true;
    }
}