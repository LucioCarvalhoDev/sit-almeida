class Filter {
    constructor({ name, phone, description, price, date }) {
        phone ? this.phone = phone.toUpperCase() : '';
        name ? this.name = name.toUpperCase() : '';
        description ? this.description = description.toUpperCase() : '';
        price ? this.price = price.toUpperCase() : '';
        date ? this.date = date.toUpperCase() : '';
    }
}