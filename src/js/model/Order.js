import md5 from "md5";
import dateFormat from "dateformat";

export default class Order {
    constructor({ name, phone, date, description, price, payment, ok, id = undefined }) {
        this.name = name;
        this.phone = phone;

        this.date = date;
        this.description = description;
        this.price = price;
        this.payment = payment;
        this.ok = ok;
        this.id = id;

        for (const prop in this) {
            if (prop == 'ok' || prop == 'id') continue;
            this[prop] = String(this[prop]).toUpperCase().trim();
        }

        this.init();
    }

    static template() {
        return {
            name: '',
            phone: '',
            date: '',
            description: '',
            price: '',
            payment: '',
            ok: '',
        };
    }

    init() {
        if (this.id == undefined)
            this.id = md5(JSON.stringify(this));
    }

    dateForView() {
        const day = new Date(this.date).getDay();

        return (day == 0 ? "Dom, " :
            day == 1 ? "Seg, " :
                day == 2 ? "Ter, " :
                    day == 3 ? "Qua, " :
                        day == 4 ? "Qui, " :
                            day == 5 ? "Sex, " :
                                day == 6 ? "Sab, " : "Err, ") + dateFormat(this.date, 'dd/mm/yyyy');
    }


}