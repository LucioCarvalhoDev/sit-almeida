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

    getFormatedDateUS() {
        const objDate = new Date(+this.date);
        return (`${objDate.getFullYear()}-${objDate.getMonth() + 1}-${String(objDate.getDate())}`);
    }

    getFormatedDateBR() {
        const objDate = new Date(+this.date);
        return (`${String(objDate.getDate())}-${objDate.getMonth() + 1}-${objDate.getFullYear()}`);
    }

    getDateForView() {
        const day = new Date(+this.date).getDay();
        return (day == 1 ? "Seg, " :
            day == 2 ? "Ter, " : 
            day == 3 ? "Qua, " :
            day == 4 ? "Qui, " :
            day == 5 ? "Sex, " :
            day == 6 ? "Sab, " :
            day == 7 ? "Dom, " : "Err, ") + this.getFormatedDateBR()

    }


}