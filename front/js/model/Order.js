class Order {
    constructor({ name, phone, date, description, price, payment, ok }) {
        this.name = name;
        this.phone = phone;

        this.date = date;
        this.description = description;
        this.price = price;
        this.payment = payment;
        this.ok = ok;

        for (const prop in this) {
            if (prop == 'ok') continue;
            this[prop] = String(this[prop]).toUpperCase();
        }
    }

    getFormatedDate() {
        const objDate = new Date(+this.date);
        return (`${objDate.getFullYear()}-${objDate.getMonth() + 1}-${String(objDate.getDay()).padStart(2, '0')}`);
    }


}