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


}